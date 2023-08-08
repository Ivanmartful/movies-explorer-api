const userRouter = require('express').Router();

const {
  getUserById, getCurrentUser, updateUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationGetUserById,
} = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);
userRouter.get('/:is', validationGetUserById, getUserById);
userRouter.patch('/me', validationUpdateUser, updateUser);

module.exports = userRouter;
