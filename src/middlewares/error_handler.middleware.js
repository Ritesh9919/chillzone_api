import {ApiError} from '../utils/ApiError.js';

export const errorhandlerMiddleware = (err, req, res, next)=> {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({message:err.message});
    }
    console.log(err);
    return res.status(500).json({message:"Internal server error"});
}