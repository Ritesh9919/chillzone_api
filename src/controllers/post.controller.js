import {Post} from '../models/post.model.js'
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'



export const createPost = async(req, res, next)=> {
    try {
        const {title, content} = req.body;
        if(!title || !content) {
            return next(new ApiError("title and content is required", 400));
        }
        
        const postUrlLocalPath = req.file?.path;
        if(!postUrlLocalPath) {
            return next(new ApiError("postUrl is required", 400));
        }

        const postUrl = await uploadOnCloudinary(postUrlLocalPath);
        if(!postUrl.url) {
            return next(new ApiError("error while uploading file on cloudinary", 400));
        }

        const post = await Post.create({
            title,
            content,
            postUrl:postUrl.url,
            postBy:req.user._id
        })

        return res.status(201).json(new ApiResponse(true, "Post created", post));
    } catch (error) {
        console.error("error in postController createPost api", error.message);
        next(error);
    }
}


export const getPostById = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new ApiError("post not found", 404));
        }
        return res.status(200).json(new ApiResponse(true, "post fetched successfully", post));
    } catch (error) {
        console.error("error in postController getPostById api", error.message);
        next(error);
    }
}

export const getAllPostByUser = async(req, res, next)=> {
    try {
        const posts = await Post.find({postBy:req.user._id});
        if(!posts) {
            return next(new ApiError("posts not found", 404));
        }
        return res.status(200).json(new ApiResponse(true, "posts fetched successfully", posts));
    } catch (error) {
        console.error("error in postController getAllPostByUser api", error.message);
        next(error);
    }
}

export const deletePostById = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new ApiError("post not found", 404));
        }
        if(!req.user._id.equals(post.postBy)) {
            return next(new ApiError("you can not delete this post", 401));
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json(new ApiResponse(true, "post deleted successfully"));

    } catch (error) {
        console.error("error in postController deletePostById api", error);
        next(error);
    }
}

export const updatePostById = async(req, res, next)=> {
    try {
        const {postId} = req.query;
        const {title, content} = req.body;
        if(!title || !content) {
            return next(new ApiError("title and content is required", 400));
        }
        const post = await Post.findById(postId);
        if(!post) {
            return next(new ApiError("post not found", 404));
        }
        if(!req.user._id.equals(post.postBy)) {
            return next(new ApiError("you can not update this post", 401));
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, {$set:{title, content}},{new:true});

        return res.status(200).json(new ApiResponse(true, "post updated successfully", updatedPost));
    } catch (error) {
        console.error("error in postController updatePostById api", error);
        next(error);
    }
}