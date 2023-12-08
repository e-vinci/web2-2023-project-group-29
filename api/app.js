const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

const playersRouter = require('./routes/players');
const levelsRouter = require('./routes/levels');
const scoresRouter = require('./routes/scores');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/players', playersRouter);
app.use('/levels', levelsRouter);
app.use('/scores', scoresRouter);

module.exports = app;
