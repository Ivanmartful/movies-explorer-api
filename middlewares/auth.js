const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../errors/NotAuthorizedError');
const { NOT_AUTHORIZED_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE));
    return;
  }
  req.user = payload;
  next();
};
