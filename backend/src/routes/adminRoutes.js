const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllRestaurants,
  getAllOrders,
  toggleUserStatus
} = require('../controllers/adminController');

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Solo administradores pueden acceder
router.get('/users', verifyToken, authorizeRoles('admin'), getAllUsers);
router.get('/restaurants', verifyToken, authorizeRoles('admin'), getAllRestaurants);
router.get('/orders', verifyToken, authorizeRoles('admin'), getAllOrders);
router.put('/users/status', verifyToken, authorizeRoles('admin'), toggleUserStatus);

module.exports = router;
