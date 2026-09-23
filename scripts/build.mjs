/**
 * Builds src/ into lib/.
 *
 * This replaces the old gulp 3 pipeline, which cannot run on Node 12 or later.
 * The three steps it performed are kept:
 *
 *   1. Compile the JS with Babel.
 *   2. Compile the LESS to CSS, keeping the same folder layout.
 *   3. Rewrite the `.less` imports in the compiled JS to point at the `.css`.
 *
 * Assets under src/assets are copied across untouched.
 */
import { spawnSync } from 'node:child_process';
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import less from 'less';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');
const libDir = join(root, 'lib');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** 1. JS — Babel handles the whole tree in one pass. */
function compileJs() {
  const result = spawnSync(
    'babel',
    // src/assets/echarts holds the map registration module, which is real JS
    // and has to be compiled like the rest; the images and GeoJSON under
    // src/assets are copied verbatim below.
    ['src', '--out-dir', 'lib', '--extensions', '.js,.jsx', '--ignore', 'src/assets/imgs,src/assets/map'],
    { cwd: root, stdio: 'inherit', shell: true },
  );
  if (result.status !== 0) {
    throw new Error(`babel exited with ${result.status}`);
  }
}

/** 2. LESS — compiled and minified next to where the JS expects it. */
async function compileLess() {
  let count = 0;
  for await (const file of walk(srcDir)) {
    if (extname(file) !== '.less') continue;
    const source = await readFile(file, 'utf8');
    const { css } = await less.render(source, {
      filename: file,
      paths: [dirname(file)],
      compress: true,
    });
    const out = join(libDir, relative(srcDir, file)).replace(/\.less$/, '.css');
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, css);
    count += 1;
  }
  return count;
}

/**
 * 3. The source imports `./Foo.less`, but only the compiled `./Foo.css` ships.
 * The old pipeline did this with gulp-replace-path.
 */
async function rewriteStyleImports() {
  let count = 0;
  for await (const file of walk(libDir)) {
    if (extname(file) !== '.js') continue;
    const before = await readFile(file, 'utf8');
    const after = before.replace(/(['"])([^'"]+)\.less\1/g, '$1$2.css$1');
    if (after !== before) {
      await writeFile(file, after);
      count += 1;
    }
  }
  return count;
}

/** The hand-written declarations ship as lib/index.d.ts. */
async function copyTypes() {
  await cp(join(root, 'types', 'index.d.ts'), join(libDir, 'index.d.ts'));
}

/** Images, fonts, models and GeoJSON are copied verbatim. */
async function copyAssets() {
  const from = join(srcDir, 'assets');
  if (!(await exists(from))) return false;
  await cp(from, join(libDir, 'assets'), {
    recursive: true,
    // The echarts map module is compiled by Babel above; copying it over the
    // compiled output would put ESM back into an otherwise CommonJS build.
    filter: (source) => !source.includes(`${sep}assets${sep}echarts`),
  });
  return true;
}

await rm(libDir, { recursive: true, force: true });
compileJs();
const styles = await compileLess();
const rewritten = await rewriteStyleImports();
const copied = await copyAssets();
await copyTypes();

console.log(
  `built lib/: ${styles} stylesheet(s), ${rewritten} file(s) repointed at .css` +
    (copied ? ', assets copied' : '') + ', types copied',
);
