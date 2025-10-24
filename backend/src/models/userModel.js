const db = require('../config/db');

const createUser = async (userData) => {
  const [result] = await db.execute(
    `INSERT INTO users (email, password, first_name, last_name, role, phone, is_verified, is_active, registration_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      userData.email,
      userData.password,
      userData.first_name,
      userData.last_name,
      userData.role,
      userData.phone,
      true,
      true
    ]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
