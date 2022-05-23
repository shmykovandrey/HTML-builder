const path = require('path');
const fs = require('fs');

function startCopy() {
  fs.rm(path.join(__dirname, 'project-dist'), {
    recursive: true
  }, () => {
    createDir();
  });

}

function createDir() {
  fs.mkdir(path.join(__dirname, 'project-dist'), {
    recursive: true
  }, () => {});
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {
    recursive: true
  }, () => {});
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), () => {
    getFilesNamesFonts();
  });
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), () => {
    getFilesNamesImg();
  });
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), () => {
    getFilesNamesSvg();
  });
}

function copyFileFonts(fname) {
  const readStream = fs.createReadStream(path.join(__dirname, 'assets', 'fonts', fname));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'assets', 'fonts', fname));
  readStream.pipe(writeStream);
}

function copyFileImg(fname) {
  const readStream = fs.createReadStream(path.join(__dirname, 'assets', 'img', fname));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'assets', 'img', fname));
  readStream.pipe(writeStream);
}

function copyFileSvg(fname) {
  const readStream = fs.createReadStream(path.join(__dirname, 'assets', 'svg', fname));
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'assets', 'svg', fname));
  readStream.pipe(writeStream);
}

function getFilesNamesFonts() {
  fs.readdir(path.join(__dirname, 'assets', 'fonts'), (err, files) => {
    if (err) console.log(err.message);
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'assets', 'fonts', file), (error, stats) => {
        if (error) console.log(error.message);
        if (stats.isFile()) {
          copyFileFonts(file);
        }
      });
    });
  });
}

function getFilesNamesImg() {
  fs.readdir(path.join(__dirname, 'assets', 'img'), (err, files) => {
    if (err) console.log(err.message);
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'assets', 'img', file), (error, stats) => {
        if (error) console.log(error.message);
        if (stats.isFile()) {
          copyFileImg(file);
        }
      });
    });
  });
}

function getFilesNamesSvg() {
  fs.readdir(path.join(__dirname, 'assets', 'svg'), (err, files) => {
    if (err) console.log(err.message);
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'assets', 'svg', file), (error, stats) => {
        if (error) console.log(error.message);
        if (stats.isFile()) {
          copyFileSvg(file);
        }
      });
    });
  });
}


startCopy();


function removeBundle() {
  fs.rm(path.join(__dirname, 'project-dist', 'style.css'), {
    recursive: true
  }, () => {
    return createBundle();
  });
}

function createBundle() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', {
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
  readStream.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), bundleArr.join(''), () => {
    return 1;
  }));
}

function mergeStyles() {
  removeBundle();
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

readHtml();

function readHtml() {
  let data = '';
  const stream = fs.createReadStream(path.join(__dirname, 'template.html'));
  stream.on('data', chunk => {
    data += chunk;
  });
  stream.on('end', () => {
    addArticles(data);
  });
}

function addArticles(data) {
  let newData = '';
  const stream = fs.createReadStream(path.join(__dirname, 'components', 'articles.html'));
  stream.on('data', chunk => {
    newData += chunk;
  });
  stream.on('end', () => {
    addFooter(data.replace('{{articles}}', newData));
  });
}

function addFooter(data) {
  let newData = '';
  const stream = fs.createReadStream(path.join(__dirname, 'components', 'footer.html'));
  stream.on('data', chunk => {
    newData += chunk;
  });
  stream.on('end', () => {
    addHeader(data.replace('{{footer}}', newData));
  });
}

function addHeader(data) {
  let newData = '';
  const stream = fs.createReadStream(path.join(__dirname, 'components', 'header.html'));
  stream.on('data', chunk => {
    newData += chunk;
  });
  stream.on('end', () => {
    addAbout(data.replace('{{header}}', newData));
  });
}

function addAbout(data) {
  let newData = '';
  const stream = fs.createReadStream(path.join(__dirname, 'components', 'about.html'));
  stream.on('error', () => {
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, err => {
      if (err) console.log(err.message);
    });
  });
  stream.on('data', chunk => {
    newData += chunk;
  });
  stream.on('end', () => {
    writeToHtmlFile(data.replace('{{about}}', newData));
  });
}

function writeToHtmlFile(data) {
  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, err => {
    if (err) console.log(err.message);
  });
}
