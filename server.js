const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./controllers/auth');
const validation = require('./middleware/validation');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/static'));

app.get('/', authenticateToken, (req, res) => {
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

app.post('/login', (req, res) => {
  auth.login(req, res);
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
});

app.listen(3000, () => {
  console.log('Server is started.');
});
