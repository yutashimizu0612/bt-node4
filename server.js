const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', function (req, res) {
  res.render('pages/index');
});

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.listen(3000, function () {
  console.log('Server is started.');
});
