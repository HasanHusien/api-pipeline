const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config/.env` });

const app = require('./app');
const port = process.env.PORT || 8000;

const mongoose = require('mongoose');
const DB = process.env.DATABASE;

//initialOptions for mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DATABASE connection successfully..'))
  .catch((err) => console.log(err));

// schema Standards for document
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'this filed is required.'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'this filed is required.'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

// apply schema standards with tour model
const Tour = mongoose.model('Tour', tourSchema);

// instance from Tour
const testTour = new Tour({
  name: 'The Wild',
  price: 472,
});

// save this document to DB
testTour
  .save()
  .then((doc) => console.log('saved to DB:', doc))
  .catch((err) => console.log('Error 💣:', err));

app.listen(port, () => {
  console.log(`listening on: 127.0.0.1:${port}`);
});
