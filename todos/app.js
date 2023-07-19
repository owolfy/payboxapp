const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes');
const app = express();

app.use(express.json());
app.use('/', indexRouter);

mongoose.connect('mongodb://localhost:27017/mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
  app.listen(3000, () => {
    console.log(`TODOS Service Started at ${3000}`);
  });
});
