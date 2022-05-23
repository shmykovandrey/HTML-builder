const path = require('path');
const fs = require('fs');
const process = require('process');

const streamInput = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

streamInput.on('data', data => process.stdout.write(data));
streamInput.on('error', error => console.log('ERROR: ' + error.message));
