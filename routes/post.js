const express = require('express');
const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  res.render('pages/posts');
});

postRouter.get('/new', (req, res) => {
  res.render('pages/post');
});

postRouter.get('/:postid', (req, res) => {
  res.render('pages/post');
});
