const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');
const { NotFoundError } = require('../errors/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
