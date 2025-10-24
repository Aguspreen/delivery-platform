const express = require('express');
const router = express.Router();
const {
  createOrder,
  getCustomerOrders,
  getRestaurantOrders
} = require('../controllers/orderController');

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Clientes crean y consultan sus pedidos
router.post('/', verifyToken, authorizeRoles('customer'), createOrder);
router.get('/customer', verifyToken, authorizeRoles('customer'), getCustomerOrders);

// Restaurantes consultan pedidos recibidos
router.get('/restaurant', verifyToken, authorizeRoles('restaurant'), getRestaurantOrders);

module.exports = router;
