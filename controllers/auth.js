const connection = require('../model/dbConnection');
const { validationResult } = require('express-validator');

exports.register = (req, res) => {
  // バリデーションエラーの場合、エラー文と入力値を渡す
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('pages/register', { errors: errors.array() });
  }
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
