import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updateAvatar,
  removeAvatar,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/avatar', protect, updateAvatar);
router.delete('/avatar', protect, removeAvatar);
router.put('/change-password', protect, changePassword);
router.delete('/account', protect, deleteAccount);

export default router;
