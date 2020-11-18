// modelsにする
const Post = require('../model/Post');

module.exports = {
  doGetAllPosts: async (req, res) => {
    console.log('doGetAllPosts');
    const posts = await Post.getAllPosts();
    res.render('pages/posts', { posts });
  },
  showEditPage: async (req, res) => {
    console.log('showEditPage');
    // idに基準に、該当のpostデータを1件取得
    const post = await Post.getPost(req.params.id);
    console.log('post at showEditPage', post);
    res.render('pages/edit', { post });
  },
  doCreateNewPost: async (req, res) => {
    console.log('doCreateNewPost');
    await Post.createNewPost(req.body.title, req.body.content);
    res.redirect('/post');
  },
  doUpdatePost: (req, res) => {
    console.log('doUpdatePost');
    // 変更されたtitleかcontentを、該当のpostデータに上書き（update）
    res.render('pages/post');
  },
};
