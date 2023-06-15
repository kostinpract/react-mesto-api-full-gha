require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
const SECRET = isProd ? process.env.JWT_SECRET : 'super-strong-secret';
const PORT = isProd ? process.env.PORT : 3000;
const MONGOURI = isProd ? process.env.MONGOURI : 'mongodb://127.0.0.1:27017/mestodb';
const REGEXPR = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  PORT,
  MONGOURI,
  SECRET,
  REGEXPR,
};
