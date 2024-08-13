import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Session} from '../models/session.model.js'
import {sendOtp} from '../utils/sendOtp.js'
import {verifyOTP}  from '../utils/verifyOtp.js'
import {resetPassword} from '../utils/resetPassword.js'
import jwt from 'jsonwebtoken'



export const registerUser = async(req, res, next)=> {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return next(new ApiError("name, email and password is required", 400));
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return next(new ApiError("User already registered", 409));
        }

        const user = await User.create({name, email, password});
        const registerUser = await User.findById(user._id).select('-password');
        return res.status(201).json(new ApiResponse(true, "user registred successfully", registerUser));
    } catch (error) {
        console.error("error in userController registerUser api", error.message);
        next(error);
    }
}


export const loginUser = async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return next(new ApiError("email and password is required", 400));
        }

        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return next(new ApiError("user not found", 404));
        }

        const isPasswordCurrect = await existingUser.isPasswordCurrect(password);
        if(!isPasswordCurrect) {
            return next(new ApiError("password is incurrect", 400));
        }

        const token = await existingUser.generateToken();
        const loginUser = await User.findById(existingUser._id).select('-password');
        const session = new Session({ userId: loginUser._id, token });
        await session.save();
        
        return res.status(200).json(new ApiResponse(true, "user login successfully", {loginUser, token} ));
    } catch (error) {
        console.error("error in userController loginUser api", error.message);
        next(error);
    }
}


export const logoutUser = async(req, res, next)=> {
    try {
        await Session.findOneAndDelete({token:req.headers['authorization']});
        return res.status(200).json(new ApiResponse(true, "Logged out successfully"));
    } catch (error) {
        console.error("error in userController logoutUser api", error.message);
        next(error);
    }
}


export const logoutUserFromAllDevices = async(req, res, next)=> {
    try {
       await Session.deleteMany({userId:req.user._id}); 
       return res.status(200).json(new ApiResponse(true, "Logged out from all devices successfully"));
    } catch (error) {
        console.error("error in userController logoutUserFromAllDevices  api", error.message);
        next(error);
    }
}


export const forgotPassword = async(req, res, next)=> {
    try {
        const {email} = req.body;
        if(!email) {
            return next(new ApiError("email is required", 400));
        }
         await sendOtp(email);
         return res.status(200).json(new ApiResponse(true, "Otp send successfully"));
    } catch (error) {
        console.error("error in userController forgotPassword  api", error.message);
        next(error);
    }
}


export const verifyOtp = async(req, res, next)=> {
    try {
        const {email, otp} = req.body;
        if(!email || !otp) {
            return next(new ApiError("email and otp is required", 400));
        }
        await verifyOTP(email, otp);
        return res.status(200).json(new ApiResponse(true, "otp verified successfully"));
    } catch (error) {
        console.error("error in userController forgotPassword  api", error.message);
        next(error);
    }
}


export const resetUserPassword = async(req, res, next)=> {
    try {
        const {email, newPassword} = req.body;
        if(!email || !newPassword) {
            return next(new ApiError("email and newPassword is required", 400));
        }
        await resetPassword(email, newPassword);
        return res.status(200).json(new ApiResponse(true, "Password reset successfully"));
    } catch (error) {
        console.error("error in userController forgotPassword  api", error.message);
        next(error);
    }
}