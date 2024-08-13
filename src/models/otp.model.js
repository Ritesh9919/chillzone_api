import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email:{
    type:String,
  },
  phone:{
    type:String
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires:720,
    default:Date.now()
  }
});

export const OTP = mongoose.model('OTP', otpSchema);


