require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
};
