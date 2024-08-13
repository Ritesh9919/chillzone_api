import { User } from '../models/user.model.js';
import crypto from 'crypto'


export const resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = newPassword;
    user.otp = null; // Clear OTP after successful password reset
    await user.save();

    return true;
  } catch (error) {
    console.error(error);
    console.log(error);
    throw error;
  }
};
