const express = require('express');
const router = express.Router();
const {
  getRestaurantProfile,
  getMenuItems,
  addMenuItem
} = require('../controllers/restaurantController');

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Solo restaurantes pueden acceder
router.get('/profile', verifyToken, authorizeRoles('restaurant'), getRestaurantProfile);
router.get('/menu', verifyToken, authorizeRoles('restaurant'), getMenuItems);
router.post('/menu', verifyToken, authorizeRoles('restaurant'), addMenuItem);

module.exports = router;
