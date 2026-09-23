import { defineConfig } from 'vitest/config';
import { transformAsync } from '@babel/core';

/**
 * The components are .js files containing JSX, which Vite does not treat as
 * JSX by default. Running them through the project's own Babel config keeps the
 * tests on the same transform as the build.
 */
const babelJsx = {
  name: 'deep-viz:babel-jsx',
  async transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) return null;
    const result = await transformAsync(code, {
      filename: id,
      presets: [['@babel/preset-react', { runtime: 'classic' }]],
      sourceMaps: true,
      babelrc: false,
      configFile: false,
    });
    return { code: result.code, map: result.map };
  },
};

export default defineConfig({
  plugins: [babelJsx],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.{js,jsx}'],
  },
});
