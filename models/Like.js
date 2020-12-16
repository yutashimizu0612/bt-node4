const mysql = require('mysql2/promise');
const db_setting = require('../models/dbSetting');
const table = 'likes';

module.exports = {
  like: async (postId, userId) => {
    console.log('------------------');
    console.log('like関数');
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`INSERT INTO ${table} SET post_id = ?, user_id = ?`, [
        postId,
        userId,
      ]);
      console.log('likeしました');
      await connection.end();
      console.log('DB接続終了');
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  deleteLike: async (postId, userId) => {
    console.log('------------------');
    console.log('deleteLike関数');
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`DELETE FROM ${table} WHERE post_id = ? AND user_id = ?`, [
        postId,
        userId,
      ]);
      console.log('deleteLikeしました');
      await connection.end();
      console.log('DB接続終了');
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  findLike: async (postId, userId) => {
    console.log('------------------');
    console.log('findLike関数');
    const sql = `SELECT id FROM ${table} WHERE post_id = ? AND user_id = ?`;
    try {
      const connection = await mysql.createConnection(db_setting);
      const [like] = await connection.execute(sql, [postId, userId]);
      console.log('like[0]', like[0]);
      await connection.end();
      if (!like[0]) return null;
      return like[0].id;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  getPostIdLikedByUser: async (userId) => {
    console.log('------------------');
    console.log('getPostIdLikedByUser関数');
    const sql = `SELECT post_id FROM ${table} WHERE user_id = ?`;
    try {
      const connection = await mysql.createConnection(db_setting);
      const [postIds] = await connection.execute(sql, [userId]);
      await connection.end();
      if (!postIds[0]) return null;
      return postIds;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
