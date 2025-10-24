const db = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT id, email, role, is_active FROM users`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM restaurants`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener restaurantes', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM orders ORDER BY created_at DESC`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { user_id, is_active } = req.body;
    await db.execute(`UPDATE users SET is_active = ? WHERE id = ?`, [is_active, user_id]);
    res.json({ message: 'Estado del usuario actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

module.exports = { getAllUsers, getAllRestaurants, getAllOrders, toggleUserStatus };
