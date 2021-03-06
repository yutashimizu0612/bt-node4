const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Auth = require('../models/Auth');
const { setAccessTokenToCookie } = require('../functions/setAccessTokenToCookie');

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
      const newUserId = await Auth.register(name, email, hash);
      setAccessTokenToCookie(res, newUserId);
      return res.redirect(301, '/');
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
      const user = await Auth.getUserByEmail(req.body.email);
      // ユーザが見つからない場合
      if (!user) {
        return res.status(403).json({ error: '登録されていないメールアドレスです。' });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        setAccessTokenToCookie(res, user.id);
        return res.redirect(301, '/');
      } else {
        return res.status(403).json({ error: 'パスワードが間違っています。' });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  logout: (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/auth/login');
  },
};
