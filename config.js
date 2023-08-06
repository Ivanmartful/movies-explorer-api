const { MONGO_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  MONGO_URL,
  JWT_SECRET,
};
