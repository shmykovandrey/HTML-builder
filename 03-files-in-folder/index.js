const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) console.log(err.message);
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (error, stats) => {
      if (error) console.log(error.message);
      if (stats.isFile()) console.log(`<${path.basename(file, path.extname(file))}>-<${path.extname(file)}>-<${stats.size/1000}kb>`);
    });
  });
});
