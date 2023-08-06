// eslint-disable-next-line prefer-destructuring
const Movie = require('../models/movie');
const {
  OK,
  CREATED,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id).then((newMovie) => {
        res.status(CREATED).send(newMovie);
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie
          .deleteOne(movie)
          .then(() => res.status(OK).send(movie))
          .catch((err) => {
            next(err);
          });
      } else next(new ForbiddenError(FORBIDDEN_MESSAGE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};
