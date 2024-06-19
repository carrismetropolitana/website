/* * */

const fs = require('fs');

/* * */

const now = new Date();
const year = now.getFullYear();
const month = padNumber(now.getMonth() + 1);
const day = padNumber(now.getDate());
const hours = padNumber(now.getHours());
const minutes = padNumber(now.getMinutes());

const newVersion = `${year}.${month}.${day}-${hours}${minutes}`;

fs.writeFileSync('./frontend/package.json', JSON.stringify({ ...require('./frontend/package.json'), version: newVersion }, null, 2));
fs.writeFileSync('./videowall/package.json', JSON.stringify({ ...require('./videowall/package.json'), version: newVersion }, null, 2));

/* * */

function padNumber(number) {
  return number.toString().padStart(2, '0');
}
