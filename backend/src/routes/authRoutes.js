const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/perfil', verifyToken, (req, res) => {
  res.json({ message: `Hola ${req.user.role}, tu ID es ${req.user.id}` });
});

router.get('/solo-admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Acceso permitido solo para administradores' });
});

// Ruta para registro
router.post('/register', register);

// Ruta para login
router.post('/login', login);

module.exports = router;
