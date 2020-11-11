const connection = require('../model/dbConnection');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  // バリデーションエラーの場合、エラー文と入力値を渡す
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('pages/register', { errors: errors.array() });
  }
  // ユーザ登録
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };
    connection.query('INSERT INTO users SET ?', newUser, function (
      error,
      result
    ) {
      if (error) {
        console.log(error);
        return res.render('pages/register', {
          errors: [{ msg: '名前かメールアドレスが重複しています。' }],
        });
      }
      console.log('new user is created');
      res.redirect('/');
    });
  });
};
