import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Comment} from '../models/comment.model.js'
import { Post } from '../models/post.model.js';


export const createComment = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const {content} = req.body;
        if(!content) {
            return next(new ApiError("content is required", 400));
        }

        const post = await Post.findOne({_id:postId});
        if(!post) {
            return next(new ApiError("post not found", 404));
        }

        const comment = await Comment.create({
            content,
            post:post._id,
            author:req.user._id
        })

        return res.status(201).json(new ApiResponse(true, "comment created", comment));
        
    } catch (error) {
        console.error("error in commentController createComment api", error.message);
        next(error);
    }
}