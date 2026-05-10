const express = require('express');
const router = express.Router();
const checkValidId = require('../middleware/checkValidId');

const { checkBody } = require('../middleware/checkBody');
const { registerRequestTime } = require('../middleware/registerRequestTime');
const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

// cycle %%  Request this route, Middleware func, Response  %%
router.get('/', registerRequestTime, getTours);
router.post('/', registerRequestTime, checkBody, createTour);

// cycle %%  Request this route, Middleware func, Middleware func, Response  %%
router.get('/:id', registerRequestTime, checkValidId, getTour);
router.patch('/:id', registerRequestTime, checkValidId, updateTour);
router.delete('/:id', registerRequestTime, checkValidId, deleteTour);

module.exports = router;
