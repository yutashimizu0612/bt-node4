const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { authenticateToken } = require('./middleware/authenticateToken');
const authRouter = require('./routes/auth');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/static'));
app.use('/auth', authRouter);

// トップページ
app.get('/', authenticateToken, (req, res) => {
  res.render('pages/index');
});

app.listen(3000, () => {
  console.log('Server is started.');
});
