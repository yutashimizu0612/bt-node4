const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Auth = require('../models/Auth');
const { generateAccessToken } = require('../functions/generateAccessToken');

require('dotenv').config();

module.exports = {
  showRegisterPage: (req, res) => {
    res.render('pages/register');
  },

  register: async (req, res) => {
    // バリデーションエラーの場合、エラー文と入力値を渡す
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/register', { errors: errors.array() });
    }
    // ユーザ登録
    try {
      const { name, email } = req.body;
      const hash = await bcrypt.hash(req.body.password, 10);
      await Auth.register(name, email, hash);
      console.log('new user is created');
      res.redirect('/');
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  showLoginPage: (req, res) => {
    res.render('pages/login');
  },

  login: async (req, res) => {
    try {
      const user = await Auth.getUserPasswordByEmail(req.body.email);
      console.log('user', user);
      // ユーザが見つからない場合
      if (!user) {
        return res.json({ error: '登録されていないメールアドレスです。' });
      }
      // ログイン処理
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const accessToken = generateAccessToken({
          name: user.name,
          email: user.email,
        });
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // ここでrefreshTokenをDBに保存？
        res.json({ token: accessToken });
      } else {
        return res.json({ error: 'パスワードが間違っています。' });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
