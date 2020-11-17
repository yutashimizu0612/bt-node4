const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.get('/', postController.doGetAllPosts);

postRouter.get('/new', (req, res) => {
  res.render('pages/post');
});

// TODO validationのmiddleware
postRouter.post('/new', postController.doCreateNewPost);

postRouter.get('/:postid/edit', postController.doGetPost);

// TODO validationのmiddleware
postRouter.post('/:postid/edit', postController.doUpdatePost);

module.exports = postRouter;
