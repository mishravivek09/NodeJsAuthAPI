const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, deleteAllUsers, getAllUsers } = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.delete('/delete-all', deleteAllUsers);
router.get("/user/all", getAllUsers);

module.exports = router;
