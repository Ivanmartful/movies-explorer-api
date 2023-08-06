/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const corsErr = require('./middlewares/cors');
const router = require('./routes/router');
const { SERVER_ERROR_MESSAGE } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер недоступен');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(corsErr);
app.use(helmet());
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? SERVER_ERROR_MESSAGE
      : message,
  });
  next();
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log('База данных не подключена');
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
