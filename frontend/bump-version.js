// import pjson from './package.json';
const packageJson = require('./package.json');
const fs = require('fs');

const now = new Date();
const year = now.getFullYear();
const month = padNumber(now.getMonth() + 1);
const day = padNumber(now.getDate());
const hours = padNumber(now.getHours());
const minutes = padNumber(now.getMinutes());

const version = `${year}.${month}.${day}-${hours}${minutes}`;

packageJson.version = version;

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));

function padNumber(number) {
  return number.toString().padStart(2, '0');
}
