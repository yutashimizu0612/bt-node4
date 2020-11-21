const mysql = require('mysql2/promise');
const db_setting = require('../models/dbSetting');
const table = 'posts';

module.exports = {
  getAllPosts: async () => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [posts] = await connection.execute(
        `SELECT ${table}.id, ${table}.title, ${table}.content, users.name FROM ${table} INNER JOIN users ON ${table}.user_id = users.id`
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
      ] = await connection.execute(
        `SELECT title, content FROM ${table} WHERE id = ?`,
        [id]
      );
      return post[0];
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
  createNewPost: async (title, content, userId) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(
        `INSERT INTO ${table} SET title = ?, content = ?, user_id = ?`,
        [title, content, userId]
      );
      console.log('new post is created');
      await connection.end();
      console.log('DBconnection is closed');
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
  updatePost: async (title, content, id) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(
        `UPDATE ${table} SET title = ?, content = ? WHERE id = ?`,
        [title, content, id]
      );
      console.log('The post is updated');
      await connection.end();
      console.log('DBconnection is closed');
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
      console.log('The post is deleted');
      await connection.end();
      console.log('DBconnection is closed');
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
