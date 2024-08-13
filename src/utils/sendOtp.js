import crypto from 'crypto';
import {User} from '../models/user.model.js';
import {sendMail} from './sendEmail.js'
import { OTP } from '../models/otp.model.js';


export const sendOtp = async(email)=> {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate OTP
    const otp = crypto.randomBytes(4).toString('hex');

    // Store OTP and expiration time in the database
    await OTP.create({email, otp});
    await sendMail(otp, email);
  } catch (error) {
    console.error(error);
    throw error;
  }
}