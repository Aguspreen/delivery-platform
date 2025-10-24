const db = require('../config/db');

const createOrder = async (req, res) => {
  try {
    const { restaurant_id, items, delivery_address_id, total_price } = req.body;

    const [orderResult] = await db.execute(
      `INSERT INTO orders (customer_id, restaurant_id, delivery_address_id, total_price, status, created_at)
       VALUES (?, ?, ?, ?, 'pending', NOW())`,
      [req.user.id, restaurant_id, delivery_address_id, total_price]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.execute(
        `INSERT INTO order_items (order_id, menu_item_id, quantity)
         VALUES (?, ?, ?)`,
        [orderId, item.menu_item_id, item.quantity]
      );
    }

    res.status(201).json({ message: 'Pedido creado', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
};

const getCustomerOrders = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};

const getRestaurantOrders = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM orders WHERE restaurant_id = ? ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos del restaurante', error: error.message });
  }
};

module.exports = { createOrder, getCustomerOrders, getRestaurantOrders };
