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

export const getCommentsOnPost = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new ApiError("post not found", 404));
        }

        const comments = await Comment.find({post:postId});
        return res.status(200).json(new ApiResponse(true, "comments fetched successfully", comments));
    } catch (error) {
        console.error("error in commentController getCommentOnPost api", error.message);
        next(error);
    }
}


export const deleteCommentById = async(req, res, next)=> {
    try {
        const {commentId} = req.query;
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return next(new ApiError("comment not found", 404));
        }
        if(!comment.author.equals(req.user._id)) {
             return next(new ApiError("you can not delete this comment", 401));
        }

        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json(new ApiResponse(true, "comment deleted successfully"));
    } catch (error) {
        console.error("error in commentController getCommentById api", error.message);
        next(error);
    }
}

export const updateCommentById = async(req, res, next)=> {
    try {
        const {commentId} = req.query;
        const {content} = req.body;
        if(!content) {
            return next(new ApiError("content is required", 400));
        }
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return next(new ApiError("comment not found", 404));
        }
        if(!comment.author.equals(req.user._id)) {
             return next(new ApiError("you can not update this comment", 401));
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {$set:{content}},
            {new:true}
        );
        return res.status(200).json(new ApiResponse(true, "comment deleted successfully", updatedComment));
    } catch (error) {
        console.error("error in commentController updateCommentById api", error.message);
        next(error);
    }
}