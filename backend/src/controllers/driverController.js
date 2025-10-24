const db = require('../config/db');

const getAssignedOrders = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM orders WHERE driver_id = ? ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos asignados', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const validStatuses = ['pending', 'accepted', 'in_transit', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    await db.execute(
      `UPDATE orders SET status = ? WHERE id = ? AND driver_id = ?`,
      [status, order_id, req.user.id]
    );

    res.json({ message: 'Estado del pedido actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
  }
};

module.exports = { getAssignedOrders, updateOrderStatus };
