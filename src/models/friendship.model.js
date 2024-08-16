import mongoose from "mongoose";


const friendshipSchema = new mongoose.Schema({
 sender:{
    type:mongoose.Types.ObjectId,
    ref:"User"
 },
 reciever:{
    type:mongoose.Types.ObjectId,
    ref:"User"
 },
 status:{
    type:String,
    enum:["accepted", "pending", "rejected"],
    default:"pending"
 }
},{timestamps:true});


export const Friendship = mongoose.model('Friendship', friendshipSchema);