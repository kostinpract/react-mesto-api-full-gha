const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-strong-secret';
const { PORT = 3000 } = process.env;
const { MONGOURI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const REGEXPR = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  PORT,
  MONGOURI,
  SECRET,
  REGEXPR,
};
