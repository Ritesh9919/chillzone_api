import express from 'express';
const router = express.Router();
import {registerUser, loginUser, logoutUser, logoutUserFromAllDevices, forgotPassword, verifyOtp, resetUserPassword} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.post('/logout-all', verifyJWT, logoutUserFromAllDevices);
router.post('/forgot-password', verifyJWT, forgotPassword);
router.post('/verify-otp', verifyJWT, verifyOtp);
router.post('/reset-password', verifyJWT, resetUserPassword);

export default router;

