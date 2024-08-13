import express from 'express';
const router = express.Router();
import {createComment, getCommentsOnPost, deleteCommentById, updateCommentById} from '../controllers/comment.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/', verifyJWT, createComment);
router.get('/', verifyJWT, getCommentsOnPost);
router.delete('/', verifyJWT, deleteCommentById);
router.put('/', verifyJWT, updateCommentById);
export default router;