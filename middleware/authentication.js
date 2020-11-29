require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.redirect(process.env.BASE_URL + ':' + process.env.PORT + '/auth/login');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.redirect(process.env.BASE_URL + ':' + process.env.PORT + '/auth/login');
      }
      req.user = user;
      next();
    });
  },
};
