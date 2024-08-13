import express from 'express';
const router = express.Router();
import {togglePostLike, toggleCommentLike, getLikesOnPost} from '../controllers/like.controller.js'
import {verifyJWT,} from '../middlewares/auth.middleware.js'

router.post('/post', verifyJWT, togglePostLike);
router.post('/comment', verifyJWT, toggleCommentLike);
router.get('/', verifyJWT, getLikesOnPost);
export default router;