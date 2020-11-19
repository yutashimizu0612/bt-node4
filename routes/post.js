const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.get('/', postController.doGetAllPosts);

postRouter.get('/new', postController.showNewPage);

// TODO validationのmiddleware
postRouter.post('/new', postController.doCreateNewPost);

postRouter.get('/:id/edit', postController.showEditPage);

// TODO validationのmiddleware
postRouter.post('/:id/edit', postController.doUpdatePost);

module.exports = postRouter;
