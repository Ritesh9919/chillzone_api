import express from 'express';
const router = express.Router();
import {
    registerUser,
     loginUser,
     logoutUser,
     logoutUserFromAllDevices,
     forgotPassword,
     verifyOtp,
     resetUserPassword,
     getUserProfileById,
     updateUserProfileById,
     getDetailsOfAllUsers
} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.post('/logout-all', verifyJWT, logoutUserFromAllDevices);

router.post('/forgot-password', verifyJWT, forgotPassword);
router.post('/verify-otp', verifyJWT, verifyOtp);
router.post('/reset-password', verifyJWT, resetUserPassword);

// user profile
router.get('/get-details', verifyJWT, getUserProfileById);
router.put('/update-details', verifyJWT, updateUserProfileById);
router.get('/get-all-details', verifyJWT, getDetailsOfAllUsers);

export default router;

