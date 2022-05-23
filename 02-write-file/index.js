const path = require('path');
const fs = require('fs');
const {
  stdin,
  stdout
} = require('process');

function createFile() {
  fs.writeFile(path.join(__dirname, 'text.txt'), '', err => {
    if (err) console.log(err.message);
  });
}

function writeFile(data) {
  fs.appendFile(path.join(__dirname, 'text.txt'), data, err => {
    if (err) console.log(err.message);
  });
}

createFile();
stdout.write('Приветствую, введите информацию для записи в файл\n');
stdin.on('data', data => {
  if (data.toString() == 'exit\r\n') {
    process.exit(1);
  }
  writeFile(data);
});

process.on('exit', () => console.log('До новых встреч!'));
process.on('SIGINT', () => process.exit(1));
