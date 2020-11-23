const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');
const validation = require('../middleware/validation');
const redirect = require('../middleware/redirect');

// ユーザ登録
authRouter.get(
  '/register',
  redirect.redirectToHome,
  authController.showRegisterPage
);

authRouter.post(
  '/register',
  redirect.redirectToHome,
  validation.validateRegisterForm(),
  authController.register
);

// ログイン
authRouter.get('/login', redirect.redirectToHome, authController.showLoginPage);

authRouter.post('/login', redirect.redirectToHome, authController.login);

// ログアウト
authRouter.get('/logout', authController.logout);

module.exports = authRouter;
