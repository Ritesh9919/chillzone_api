import express from 'express';
const router = express.Router();
import {
    createPost,
    getPostById,
    getAllPostByUser,
    deletePostById,
    updatePostById,
    getAllPostForHomePage
} from '../controllers/post.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'
router.get('/all', getAllPostForHomePage);
router.post('/', verifyJWT, upload.single('postUrl'), createPost);
router.get('/', verifyJWT, getAllPostByUser);
router.get('/', verifyJWT, getPostById);
router.delete('/', verifyJWT, deletePostById);
router.put('/', verifyJWT, updatePostById);


export default router;