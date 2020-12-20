const express = require('express');
const likeRouter = express.Router();

const likeController = require('../controllers/likeController');
const { authenticateToken } = require('../middleware/authentication');

likeRouter.post('/', authenticateToken, likeController.toggleLike);

module.exports = likeRouter;
