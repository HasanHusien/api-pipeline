const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRoutes = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', usersRouter);

module.exports = app;
