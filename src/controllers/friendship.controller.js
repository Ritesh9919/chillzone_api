import { User } from "../models/user.model.js";
import { Friendship } from "../models/friendship.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";




export const toggleFriendship = async(req, res, next)=> {
    try {
         const {friendId} = req.query;
         const user = await User.findById(friendId);
         if(!user) {
            return next(new ApiError("user not found", 404));
         }

         if(req.user._id.equals(friendId)) {
            return next(new ApiError("You can not follow yourself", 400));
         }
         
        const friendship = await Friendship.findOne({sender:req.user._id, reciever:friendId});
        
        if(friendship) {
             await friendship.deleteOne();
            return next(new ApiError("canceled friend request", 200));
        }

        await Friendship.create({sender:req.user._id, reciever:friendId});
        return res.status(201).json(new ApiResponse(true, "Friend request sended"));


         
    } catch (error) {
        console.log("error in friendshipController toggleFriendship api", error.message);
        next(error);
    }
}

export const getUserFriends = async(req, res, next)=> {
    try {
        const friends = await Friendship.aggregate([
            {
                $match:{
                    sender:new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"reciever",
                    foreignField:"_id",
                    as:"followers",
                    pipeline:[
                        {
                            $project:{
                                name:1,
                                avatar:1
                            }
                        }
                    ]
                }
            },
            {
                $project:{
                    followers:1
                }
            }
        ])
        if(!friends) {
            return next(new ApiError("friend not found", 404));
        }
        return res.status(200).json(new ApiResponse(true, "friends fetched successfully", friends));

    } catch (error) {
        console.log("error in friendshipController getUserFriends api", error.message);
        next(error);
    }
}

export const getPendingFriendRequests = async(req, res, next)=> {
    try {
        const pendingFriendRequest = await Friendship.aggregate([
            {
                $match:{
                    sender:new mongoose.Types.ObjectId(req.user._id),
                    status:"pending"
                }
            },
            {
               $lookup:{
                from:"users",
                localField:"reciever",
                foreignField:"_id",
                as:"pendingFriendRequest",
                pipeline:[
                    {
                        $project:{
                            name:1,
                            avatar:1
                        }
                    }
                ]
               }
            },
            {
                $project:{
                    pendingFriendRequest:1
                }
            }
        ])

        if(!pendingFriendRequest) {
            return next(new ApiError("no pending request", 404));
        }

        return res.status(200).json(new ApiResponse(true, "fetched pending request", pendingFriendRequest))
    } catch (error) {
        console.log("error in friendshipController getPendingFriendRequests api", error.message);
        next(error);
    }
}

export const acceptOrRejectFriendRequest = async(req, res, next)=> {
    try {
        const {id} = req.query;
         const friendship = await Friendship.findOne({_id:id, reciever:req.user._id}).sort({_id:-1})
         if(friendship.status == "pending") {
            friendship.status = "accepted";
         }else if(friendship.status == "accepted") {
            friendship.status = "rejected";
         }

         await friendship.save();
        
        return res.status(200).json(new ApiResponse(true, friendship.status == "rejected"?"rejected":"accepted"));

    } catch (error) {
        console.log("error in friendshipController acceptOrRejectFriendRequest api", error.message);
        next(error);
    }
}

