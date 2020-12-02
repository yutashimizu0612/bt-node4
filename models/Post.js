const mysql = require('mysql2/promise');
const db_setting = require('../models/dbSetting');
const table = 'posts';

module.exports = {
  getAllPosts: async () => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [posts] = await connection.execute(
        ` SELECT ${table}.id, ${table}.title, ${table}.content,${table}.user_id, users.name, COUNT(likes.post_id) AS likes
          FROM ${table}
          INNER JOIN users ON ${table}.user_id = users.id
          LEFT JOIN likes ON ${table}.id = likes.post_id
          GROUP BY ${table}.id
        `
      );
      return posts;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  getPost: async (id) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [
        post,
      ] = await connection.execute(`SELECT title, content, user_id FROM ${table} WHERE id = ?`, [
        id,
      ]);
      return post[0];
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  getPostUserId: async (id) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [post] = await connection.execute(`SELECT user_id FROM ${table} WHERE id = ?`, [id]);
      return post[0].user_id;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  createNewPost: async (title, content, userId) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`INSERT INTO ${table} SET title = ?, content = ?, user_id = ?`, [
        title,
        content,
        userId,
      ]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  updatePost: async (title, content, id) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`UPDATE ${table} SET title = ?, content = ? WHERE id = ?`, [
        title,
        content,
        id,
      ]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },

  deletePost: async (id) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
      await connection.end();
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
