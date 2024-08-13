import express from 'express';
const router = express.Router();
import {togglePostLike, toggleCommentLike} from '../controllers/like.controller.js'
import {verifyJWT,} from '../middlewares/auth.middleware.js'

router.post('/post', verifyJWT, togglePostLike);
router.post('/comment', verifyJWT, toggleCommentLike);
export default router;