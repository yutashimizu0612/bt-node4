const mysql = require('mysql2/promise');
// dbに名前変える
const db_setting = require('../model/dbSetting');
const table = 'posts';

module.exports = {
  getAllPosts: async () => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [posts] = await connection.execute(`SELECT * FROM ${table}`);
      return posts;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
  getPost: async id => {
    try {
      const connection = await mysql.createConnection(db_setting);
      const [
        post,
      ] = await connection.execute(`SELECT * FROM ${table} WHERE id = ?`, [id]);
      return post[0];
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
  // TODO 投稿ユーザのidも追加する必要あり
  createNewPost: async (title, content) => {
    try {
      const connection = await mysql.createConnection(db_setting);
      await connection.execute(
        `INSERT INTO ${table} SET title = ?, content = ?`,
        [title, content]
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
};
