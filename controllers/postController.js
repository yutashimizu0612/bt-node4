// modelsにする
const Post = require('../model/Post');

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
    await Post.createNewPost(req.body.title, req.body.content);
    res.redirect('/post');
  },
  doUpdatePost: async (req, res) => {
    await Post.updatePost(req.body.title, req.body.content, req.params.id);
    res.redirect('/post');
  },
  doDeletePost: async (req, res) => {
    await Post.deletePost(req.params.id);
    res.redirect('/post');
  },
};
