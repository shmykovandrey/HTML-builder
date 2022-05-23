const path = require('path');
const fs = require('fs');

function removeBundle() {
  fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), {
    recursive: true
  }, () => {
    return createBundle();
  });
}

function createBundle() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', {
    recursive: true
  }, () => {
    return getFilesNames();
  });
}

function readStyles(file) {
  const bundleArr = [];
  const readStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
  readStream.on('data', data => {
    bundleArr.push(data);
  });
  readStream.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), bundleArr.join(''), () => {
    return 1;
  }));
}

function mergeStyles() {
  removeBundle();
  // getFilesNames();
}

function getFilesNames() {
  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) console.log(err.message);
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'styles', file), (error, stats) => {
        if (error) console.log(error.message);
        if (stats.isFile()) {
          if (path.extname(file) === '.css') readStyles(file);
        }
      });
    });
  });
}

mergeStyles();
