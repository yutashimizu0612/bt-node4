const express = require('express');
const postRouter = express.Router();

const postController = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authentication');
const validation = require('../middleware/validation');

postRouter.get('/', authenticateToken, postController.doGetAllPosts);

postRouter.get('/new', authenticateToken, postController.showNewPage);

postRouter.post(
  '/new',
  authenticateToken,
  validation.validatePostForm(),
  postController.doCreateNewPost
);

postRouter.get('/:id/edit', authenticateToken, postController.showEditPage);

postRouter.post(
  '/:id/edit',
  authenticateToken,
  validation.validatePostForm(),
  postController.doUpdatePost
);

postRouter.get('/:id/delete', authenticateToken, postController.doDeletePost);

postRouter.get('/:id/like', authenticateToken, postController.toggleLike);

// postRouter.get('/:id/like', authenticateToken, postController.doLike);

// postRouter.get('/:id/like/delete', authenticateToken, postController.doDeleteLike);

module.exports = postRouter;
