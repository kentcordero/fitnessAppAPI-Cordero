const express = require('express');
const { verify } = require('../auth');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getProfile', verify, userController.getProfile);
router.patch('/updateProfile', verify, userController.updateProfile);

module.exports = router;