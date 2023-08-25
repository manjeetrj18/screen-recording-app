const express = require('express');
const userController = require('../controllers/userController.js');
const protect = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
