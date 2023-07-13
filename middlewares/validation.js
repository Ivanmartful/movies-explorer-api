const { celebrate, Joi } = require('celebrate');
const { BadRequestError } = require('../errors/BadRequestError');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

const validationUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  if (url.match(/http(s)?:\/\/(ww.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/gi)) {
    return url;
  }
  throw new BadRequestError(BAD_REQUEST_MESSAGE);
};

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validationGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(50).required(),
    director: Joi.string().min(2).max(50).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(4).required(),
    description: Joi.string().min(2).max(2000).required(),
    image: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validationGetMovieById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
