const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

// Examples
const usersRouter = require('./routes/examples/users');
const pizzaRouter = require('./routes/examples/pizzas');
const authsRouter = require('./routes/examples/auths');

// Remember or Die
const playersRouter = require('./routes/players');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

// Examples
app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/auths', authsRouter);
app.use('/players', playersRouter);

// Remember or Die
app.use('/players', playersRouter);

module.exports = app;
