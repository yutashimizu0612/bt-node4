const connection = require('../model/dbConnection');

exports.register = req => {
  // ユーザ登録
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  connection.query('INSERT INTO users SET ?', newUser, function (err, result) {
    if (err) throw err;
    console.log('new user is created');
  });
};
