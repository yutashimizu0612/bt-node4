const { generateAccessToken } = require('./generateAccessToken');

exports.setAccessTokenToCookie = (res, id) => {
  const accessToken = generateAccessToken({ id: id });
  res.cookie('accessToken', accessToken, {
    maxAge: 900000,
    httpOnly: true,
  });
};
