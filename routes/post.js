const express = require('express');
const postRouter = express.Router();

const postController = require('../controllers/postController');
const validation = require('../middleware/validation');
const { authenticateToken } = require('../middleware/authenticateToken');

// TODO 他のrouteにもauthenticateTokenを追加
postRouter.get('/', postController.doGetAllPosts);

postRouter.get('/new', postController.showNewPage);

postRouter.post(
  '/new',
  authenticateToken,
  validation.validatePostForm(),
  postController.doCreateNewPost
);

postRouter.get('/:id/edit', postController.showEditPage);
postRouter.post(
  '/:id/edit',
  validation.validatePostForm(),
  postController.doUpdatePost
);

postRouter.get('/:id/delete', postController.doDeletePost);

module.exports = postRouter;
