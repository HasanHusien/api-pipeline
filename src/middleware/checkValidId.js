const service = require('../services/tourService');

module.exports = (req, res, next) => {
  const id = Number(req.params.id);

  const tour = service.getTourById(id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  next();
};
