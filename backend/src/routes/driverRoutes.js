const express = require('express');
const router = express.Router();
const {
  getAssignedOrders,
  updateOrderStatus
} = require('../controllers/driverController');

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Solo repartidores pueden acceder
router.get('/orders', verifyToken, authorizeRoles('driver'), getAssignedOrders);
router.put('/orders/status', verifyToken, authorizeRoles('driver'), updateOrderStatus);

module.exports = router;
