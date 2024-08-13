import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   content:{
    type:String,
    required:true
   },
   postUrl:{
    type:String
   },
   postBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
   }
},{timestamps:true});


export const Post = mongoose.model('Post', postSchema);