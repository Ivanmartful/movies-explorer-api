const userRouter = require('express').Router();

const {
  getUserById, updateUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationGetUserById,
} = require('../middlewares/validation');

userRouter.get('/me', getUserById);
userRouter.patch('/me', validationUpdateUser, updateUser);

module.exports = userRouter;
