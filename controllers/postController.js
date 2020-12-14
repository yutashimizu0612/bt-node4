const Post = require('../models/Post');
const { validationResult } = require('express-validator');

module.exports = {
  doGetAllPosts: async (req, res) => {
    const posts = await Post.getAllPosts();
    // ログイン中のユーザがいいねしているidを取得
    // likeStatus: true/falseをpostsオブジェクトのそれぞれの要素に追加
    res.render('pages/posts', { posts, id: req.user.id });
  },

  showNewPage: (req, res) => {
    res.render('pages/new');
  },

  showEditPage: async (req, res) => {
    const post = await Post.getPost(postId);
    if (!post) return res.render('pages/404');
    if (post.user_id !== req.user.id) return res.redirect(301, '/post'); // 自身の投稿編集ページ以外は投稿トップへリダイレクト
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
    const userId = await Post.getPostUserId(id);
    if (userId === req.user.id) {
      await Post.updatePost(title, content, id);
      return res.redirect(301, '/post');
    }
    return res.status(403).json({ error: 'このページの編集は許可されていません' });
  },

  doDeletePost: async (req, res) => {
    const userId = await Post.getPostUserId(req.params.id);
    if (userId === req.user.id) {
      await Post.deletePost(req.params.id);
      return res.redirect(301, '/post');
    }
    return res.status(403).json({ error: 'このページの削除は許可されていません' });
  },
};
