const movieRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
  validationGetMovieById,
} = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validationCreateMovie, createMovie);
movieRouter.delete('/:movieId', validationGetMovieById, deleteMovie);

module.exports = movieRouter;
