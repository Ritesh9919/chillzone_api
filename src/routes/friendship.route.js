import express from 'express';
const router = express.Router();
import {
  toggleFriendship,
  getUserFriends,
  getPendingFriendRequests,
  acceptOrRejectFriendRequest
} from '../controllers/friendship.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/toggle-friendship', verifyJWT, toggleFriendship);
router.get('/get-friends', verifyJWT, getUserFriends);
router.get('/get-pending-request', verifyJWT, getPendingFriendRequests);
router.post('/response-to-request', verifyJWT, acceptOrRejectFriendRequest);

export default router;