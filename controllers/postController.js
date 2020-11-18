// modelsにする
const Post = require('../model/Post');

module.exports = {
  doGetAllPosts: async (req, res) => {
    const posts = await Post.getAllPosts();
    res.render('pages/posts', { posts });
  },
  showEditPage: async (req, res) => {
    const post = await Post.getPost(req.params.id);
    res.render('pages/edit', { post });
  },
  doCreateNewPost: async (req, res) => {
    await Post.createNewPost(req.body.title, req.body.content);
    res.redirect('/post');
  },
  doUpdatePost: (req, res) => {
    console.log('doUpdatePost');
    // 変更されたtitleかcontentを、該当のpostデータに上書き（update）
    res.render('pages/post');
  },
};
