const mysql = require('mysql2/promise');
const db_setting = require('../models/dbSetting');

module.exports = {
  register: async (name, email, hash) => {
    try {
      connection = await mysql.createConnection(db_setting);
      await connection.execute(
        'INSERT INTO users SET name = ?, email = ?, password = ?',
        [name, email, hash]
      );
      console.log('new user is created');
      await connection.end();
      console.log('DBconnection is closed');
      return;
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
  getUserByEmail: async (email) => {
    try {
      connection = await mysql.createConnection(db_setting);
      const [
        user,
      ] = await connection.execute('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
      return user[0];
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({ error: error });
    }
  },
};
