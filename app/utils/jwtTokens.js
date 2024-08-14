const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function setToken(paramToken, { duration, shorthandUnit }) {
  return jwt.sign(paramToken, secretKey, duration ?
    { expiresIn: `${duration + shorthandUnit}` } : '');
}

function decodeToken(token) {
  const stringToken = token.split(' ')[1];
  return jwt.verify(stringToken, secretKey);
}

module.exports = {
  setToken,
  decodeToken,
};
