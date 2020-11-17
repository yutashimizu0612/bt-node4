// modelsにする
const Post = require('../model/Post');

module.exports = {
  doGetAllPosts: (req, res) => {
    console.log('doGetAllPosts');
    // DBから全postデータを取得
    // res.renderにそのpostデータを渡す
    res.render('pages/posts');
  },
  doGetPost: (req, res) => {
    console.log('doGetPost');
    // idに基準に、該当のpostデータを1件取得
    res.render('pages/post');
  },
  doCreateNewPost: async (req, res) => {
    console.log('doCreateNewPost');
    console.log('req.body', req.body);
    await Post.createNewPost(req.body.title, req.body.content);
    res.redirect('/post');
    // req.body.title / req.body.content
    // 「入力されたtitleとcontent」と「ログイン中のuser」を取得し、DBにINSERT
  },
  doUpdatePost: (req, res) => {
    console.log('doUpdatePost');
    // 変更されたtitleかcontentを、該当のpostデータに上書き（update）
    res.render('pages/post');
  },
};
