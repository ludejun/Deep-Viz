const fs = require('fs');
const path = require('path');

const filePath = path.resolve();
fs.readdir(filePath, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach((filename) => {
    fs.stat(path.join(filePath, filename), (er, stats) => {
      if (er) throw er;
      if (stats.isDirectory() && filename === 'src') {
        const name = filename;
        readFile(path.join(filePath, filename), name);
      }
    });
  });
});
function getdir(url) {
  const arr = url.split('.');
  const len = arr.length;
  return arr[len - 1];
}
function readFile(readurl, name) {
  fs.readdir(readurl, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((filename) => {
      fs.stat(path.join(readurl, filename), (er, stats) => {
        if (er) throw er;
        if (stats.isFile() && getdir(filename) !== 'js' && getdir(filename) !== 'DS_Store' && getdir(filename) !== 'md') {
          const newUrl = `${filePath}/${name}/${filename}`;
          const desUrl = newUrl.replace('src', 'lib');
          const desArray = desUrl.split('lib');
          const basefolder = `${desArray[0]}lib`;
          const folders = desArray[1].split('/');
          folders.shift();
          const length = folders.length;
          let tempName = basefolder;
          for (let i = 0; i < length; i++) {
            if (folders[i].indexOf('.') === -1) {
              tempName += `/${folders[i]}`;
              if (!fsExistsSync(tempName)) {
                fs.mkdirSync(tempName);
              }
            }
          }
          const readable = fs.createReadStream(newUrl);
          const writable = fs.createWriteStream(desUrl);
          readable.pipe(writable);
          console.log(`${filename}复制成功`);
        } else if (stats.isDirectory()) {
          const dirName = filename;
          readFile(path.join(readurl, filename), `${name}/${dirName}`);
        }
      });
    });
  });
}
function fsExistsSync(paths) {
  try {
    fs.accessSync(paths, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}
