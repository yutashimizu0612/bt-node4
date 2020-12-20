const Like = require('../models/Like');

module.exports = {
  toggleLike: async (req, res) => {
    const postId = parseInt(req.body.postId);
    const userId = req.user.id;
    const like = await Like.findLike(postId, userId);
    if (like === null) {
      Like.like(postId, userId);
    } else {
      Like.deleteLike(postId, userId);
    }
    return res.redirect(301, '/post');
  },
};
