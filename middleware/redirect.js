module.exports = {
  redirectToHome: (req, res, next) => {
    if (req.cookies.accessToken) {
      res.redirect('/');
    } else {
      next();
    }
  },
};
