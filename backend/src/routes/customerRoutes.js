const express = require('express');
const router = express.Router();
const {
  getCustomerProfile,
  getCustomerAddresses,
  addCustomerAddress
} = require('../controllers/customerController');

const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Solo clientes pueden acceder
router.get('/profile', verifyToken, authorizeRoles('customer'), getCustomerProfile);
router.get('/addresses', verifyToken, authorizeRoles('customer'), getCustomerAddresses);
router.post('/addresses', verifyToken, authorizeRoles('customer'), addCustomerAddress);

module.exports = router;
