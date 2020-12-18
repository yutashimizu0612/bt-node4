const mysql = require('mysql2/promise');
const db_setting = require('../models/dbSetting');
const table = 'likes';

module.exports = {
  like: async (postId, userId) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`INSERT INTO ${table} SET post_id = ?, user_id = ?`, [
        postId,
        userId,
      ]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  deleteLike: async (postId, userId) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`DELETE FROM ${table} WHERE post_id = ? AND user_id = ?`, [
        postId,
        userId,
      ]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  findLike: async (postId, userId) => {
    const sql = `SELECT id FROM ${table} WHERE post_id = ? AND user_id = ?`;
    try {
      const connection = await mysql.createConnection(db_setting);
      const [like] = await connection.execute(sql, [postId, userId]);
      await connection.end();
      if (!like[0]) return null;
      return like[0].id;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  getPostIdsLikedByLoggedInUser: async (userId) => {
    const sql = `SELECT post_id FROM ${table} WHERE user_id = ?`;
    try {
      const connection = await mysql.createConnection(db_setting);
      const [postIds] = await connection.execute(sql, [userId]);
      await connection.end();
      return postIds;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  deleteLikesByPostId: async (postId) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`DELETE FROM ${table} WHERE post_id = ?`, [postId]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
