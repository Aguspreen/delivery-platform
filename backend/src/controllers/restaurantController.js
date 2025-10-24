const db = require('../config/db');

const getRestaurantProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, name, email, phone, address, cuisine_type FROM restaurants WHERE user_id = ?`,
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Restaurante no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM menu_items WHERE restaurant_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener menú', error: error.message });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, is_available } = req.body;
    await db.execute(
      `INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, name, description, price, category, is_available]
    );
    res.status(201).json({ message: 'Plato agregado al menú' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar plato', error: error.message });
  }
};

module.exports = { getRestaurantProfile, getMenuItems, addMenuItem };
