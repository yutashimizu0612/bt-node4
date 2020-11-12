const mysql = require('mysql2/promise');
const db_setting = require('../model/dbSetting');
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

exports.login = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(db_setting);
    const [
      user,
    ] = await connection.execute('SELECT * FROM users WHERE email = ?', [
      req.body.email,
    ]);
    console.log('user', user);
    // ユーザが見つからない場合
    if (!user[0]) {
      console.log('email not found');
      return res.json({ message: '登録されていないメールアドレスです。' });
    }
    // ログイン処理
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (match) {
      // login
      console.log('login success');
      res.redirect('/');
    } else {
      console.log('password error');
      return res.json({ message: 'パスワードが間違っています。' });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({ error: error });
  } finally {
    connection.end();
    return;
  }
};
