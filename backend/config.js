require('dotenv').config();

const prod = process.env.NODE_ENV === 'production';
const SECRET = prod ? process.env.JWT_SECRET : 'super-strong-secret';
const { PORT = 3000 } = process.env.PORT;
const { MONGOURI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env.MONGOURI;
const REGEXPR = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  PORT,
  MONGOURI,
  SECRET,
  REGEXPR,
};
