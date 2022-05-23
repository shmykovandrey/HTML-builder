const path = require('path');
const fs = require('fs');

// function copyFile(fname) {
//   const readStream = fs.createReadStream(path.join(__dirname, 'files', fname));
//   const writeStream = fs.createWriteStream(path.join(__dirname, 'files-copy', fname));
//   readStream.pipe(writeStream);
// }

// function getFilesNames() {
//   fs.readdir(path.join(__dirname, 'files'), (err, files) => {
//     if (err) console.log(err.message);
//     files.forEach(file => {
//       fs.stat(path.join(__dirname, 'files', file), (error, stats) => {
//         if (error) console.log(error.message);
//         if (stats.isFile()) {
//           console.log(file);
//           copyFile(file);
//         }
//       });
//     });
//   });
// }

async function rmBuildProjectDir() {
  console.log('delete');
  await fs.rm(path.join(__dirname, 'project-dist'), {
    recursive: true
  }, () => {
    console.log('rmBuildProjectDir');
    createDir(path.join(__dirname, 'project-dist'))
  });
}

async function createBuildProjectDir() {
  console.log('create');
}

async function createDir(dirPath) {
  await fs.mkdir(dirPath, {
    recursive: true
  }, () => {
    console.log('createDir');
  });
}

async function buildProject() {
  //delete build project dir
  await rmBuildProjectDir();
  //create build project dir
  await createBuildProjectDir();
}

buildProject();
