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