const Post = require('../models/Post');
const { validationResult } = require('express-validator');

module.exports = {
  doGetAllPosts: async (req, res) => {
    const posts = await Post.getAllPosts();
    res.render('pages/posts', { posts });
  },
  showNewPage: (req, res) => {
    res.render('pages/new');
  },
  showEditPage: async (req, res) => {
    const post = await Post.getPost(req.params.id);
    res.render('pages/edit', { post, id: req.params.id });
  },
  doCreateNewPost: async (req, res) => {
    // バリデーションエラーの場合、エラー文を渡す
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/new', { errors: errors.array() });
    }
    await Post.createNewPost(req.body.title, req.body.content, req.user.id);
    return res.redirect(301, '/post');
  },
  doUpdatePost: async (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    // バリデーションエラーの場合、エラー文と入力値を渡す
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/edit', {
        errors: errors.array(),
        post: { title, content },
        id,
      });
    }
    await Post.updatePost(title, content, id);
    return res.redirect(301, '/post');
  },
  doDeletePost: async (req, res) => {
    await Post.deletePost(req.params.id);
    return res.redirect(301, '/post');
  },
};
