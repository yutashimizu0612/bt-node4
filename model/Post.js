const mysql = require('mysql2/promise');
// dbに名前変える
const db_setting = require('../model/dbSetting');
const table = 'posts';

module.exports = {
  getAllPosts: () => {},
  getPost: () => {},
  // TODO 投稿ユーザのidも追加する必要あり
  createNewPost: async (title, content) => {
    let connection;
    try {
      connection = await mysql.createConnection(db_setting);
      await connection.execute(
        `INSERT INTO ${table} SET title = ?, content = ?`,
        [title, content]
      );
      console.log('new post is created');
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    } finally {
      console.log('DBconnection is closed');
      await connection.end();
      return;
    }
  },
  updatePost: () => {},
};
