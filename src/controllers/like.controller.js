import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Comment} from '../models/comment.model.js'
import { Post } from '../models/post.model.js';
import {Like} from '../models/like.model.js'


export const togglePostLike = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const post = await Post.findOne({_id:postId});
        if(!post) {
            return next(new ApiError("post not found", 404));
        }
        let deleted;
        const isLikeExist = await Like.findOne({likedBy:req.user._id, post:postId});
        if(isLikeExist) {
            await isLikeExist.deleteOne();
            deleted = true;
        }else{
            await Like.create({post:postId, likedBy:req.user._id});
            deleted = false;
        }

        return res.status(201).json(new ApiResponse(true, deleted?"Unliked":"Liked"));
        
    } catch (error) {
        console.error("error in likeController toggleLikeOnPost api", error.message);
        next(error);
    }
}


export const toggleCommentLike = async(req, res, next)=> {
    try {
        const {commentId} = req.query;
        const comment = await Comment.findOne({_id:commentId});
        if(!comment) {
            return next(new ApiError("comment not found", 404));
        }
        let deleted;
        const isLikeExist = await Like.findOne({likedBy:req.user._id, comment:commentId});
        if(isLikeExist) {
            await isLikeExist.deleteOne();
            deleted = true;
        }else{
            await Like.create({comment:commentId, likedBy:req.user._id});
            deleted = false;
        }

        return res.status(201).json(new ApiResponse(true, deleted?"Unliked":"Liked"));
        
    } catch (error) {
        console.error("error in likeController toggleLikeOnComment api", error.message);
        next(error);
    }
}