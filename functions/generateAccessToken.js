require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateAccessToken = username => {
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
};
