import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   avatar:{
    type:String
   }
},{timestamps:true});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCurrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function(password){
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_SECRET_EXPIRY});
}

export const User = mongoose.model("User", userSchema);