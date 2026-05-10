const fs = require('fs');
const service = require('../services/tourService');

let tours = service.getAllTours();
let getTourById = service.getTourById;

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestTime: req.requestTime,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  const id = Number(req.params.id);
  const tour = getTourById(id);

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(`${__dirname}/../data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) console.error(err);

    res.status(201).json({
      status: 'success',
      requestTime: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = getTourById(id);
  const updatedTour = { ...tour, ...req.body };

  const passedTours = tours.filter((tour) => {
    return tour.id !== Number(req.params.id);
  });

  tours = [...passedTours, updatedTour];

  if (req.body) {
    fs.writeFile(
      `${__dirname}/../data/data/tours-simple.json`,
      JSON.stringify(tours),

      (err) => {
        res.status(200).json({
          status: 'success',
          message: 'this data was [updated]',
          requestTime: req.requestTime,
          updatedValue: req.body,
        });
      },
    );
  }
};

exports.deleteTour = (req, res) => {
  const filteredTours = tours.filter((tour) => {
    return tour.id !== Number(req.params.id);
  });

  fs.writeFile(
    `${__dirname}/../data/data/tours-simple.json`,
    JSON.stringify(filteredTours),
    (err) => {
      res.status(202).json({
        status: 'success',
        message: 'this tour deleted successfully',
        requestTime: req.requestTime,
      });
    },
  );
};
