import { OTP } from '../models/otp.model.js';


export const verifyOTP = async (email, resetPasswordOtp) => {
  try {
    const otp = await OTP.findOne({email, otp:resetPasswordOtp});
    if(!otp) {
      throw new Error("Invalid otp or expired");
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
