const Like = require('../models/Like');

module.exports = {
  toggleLike: async (req, res) => {
    // req.params.idでpostIdを取るより、フロント側でajax通信をする際に、postIdをPOSTで送信してもらう。
    // そうすれば、urlにidを入れなくてもよくなるよね。そうすれば、url直打ちの対処の必要性がなくなる。
    console.log('------------------');
    console.log('toggleLike');
    console.log('req.body', req.body);
    const postId = parseInt(req.body.postId);
    const userId = req.user.id;
    const like = await Like.findLike(postId, userId);
    console.log('findLikeの戻り値', like);
    if (like === null) {
      Like.like(postId, userId);
    } else {
      Like.deleteLike(postId, userId);
    }
    return res.redirect(301, '/post');
  },
};
