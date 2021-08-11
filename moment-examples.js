var moment = require('moment');
moment.locale('pt-br');
var now = moment();

// console.log(now.format());

// now.subtract(1, 'year');

// console.log(now.format('ddd DD MMM YYYY H:mm:ss'));

console.log(now.format());
console.log(now.format('X'));
console.log(now.format('x'));
console.log(now.valueOf());

var timestamp = 1628713256853;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('H:mm'));