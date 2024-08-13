import express from 'express';
const router = express.Router();
import {createPost} from '../controllers/post.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

router.post('/', verifyJWT, upload.single('postUrl'), createPost);


export default router;