const db = require('../config/db');

const getCustomerProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT id, first_name, last_name, email, phone FROM users WHERE id = ? AND role = 'customer'`, [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

const getCustomerAddresses = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM customer_addresses WHERE customer_id = ?`, [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener direcciones', error: error.message });
  }
};

const addCustomerAddress = async (req, res) => {
  try {
    const { street, city, state, postal_code, country, reference } = req.body;
    await db.execute(
      `INSERT INTO customer_addresses (customer_id, street, city, state, postal_code, country, reference)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, street, city, state, postal_code, country, reference]
    );
    res.status(201).json({ message: 'Dirección agregada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar dirección', error: error.message });
  }
};

module.exports = { getCustomerProfile, getCustomerAddresses, addCustomerAddress };
