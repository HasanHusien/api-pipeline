const fs = require('fs');

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`),
);
// make it iterable
let tours = Object.values(data);

exports.getAllTours = () => tours;
exports.getTourById = (id) => tours.find((t) => t.id === id);
