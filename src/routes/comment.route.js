import express from 'express';
const router = express.Router();
import {createComment} from '../controllers/comment.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/', verifyJWT, createComment);
export default router;