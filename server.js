const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const connection = require('./model/dbConnection');
const auth = require('./controllers/auth');
const validation = require('./functions/validation');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.post('/register', validation.validateRegisterForm(), (req, res) => {
  auth.register(req, res);
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.listen(3000, () => {
  console.log('Server is started.');
});
