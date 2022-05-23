const path = require('path');
const fs = require('fs');

function startCopy() {
  fs.rm(path.join(__dirname, 'files-copy'), {
    recursive: true
  }, () => {
    return createDir();
  });

}

function createDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true
  }, () => {
    return getFilesNames();
  });
}

function copyFile(fname) {
  const readStream = fs.createReadStream(path.join(__dirname, 'files', fname));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'files-copy', fname));
  readStream.pipe(writeStream);
}

function getFilesNames() {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) console.log(err.message);
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'files', file), (error, stats) => {
        if (error) console.log(error.message);
        if (stats.isFile()) {
          console.log(file);
          copyFile(file);
        }
      });
    });
  });
}

startCopy();
