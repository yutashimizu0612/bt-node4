const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');
const validation = require('../middleware/validation');

// ユーザ登録
authRouter.get('/register', authController.showRegisterPage);

authRouter.post(
  '/register',
  validation.validateRegisterForm(),
  authController.register
);

// ログイン
authRouter.get('/login', authController.showLoginPage);

authRouter.post('/login', authController.login);

module.exports = authRouter;
