//1. import nodemailer
import nodeMailer from 'nodemailer';

// 2. configre email to send


export async function sendMail(otp, email){
    // 1. Create an email transporter
    // SMTP (Simple Mail Transfer Protocol)
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })

    // 2. Configure email content
    const mailOption = {
        from:"riteshkumar411552@gmail.com",
        to:email,
        subject:"Email for reset password",
        html:`<h1>Reset password otp: ${otp}`
    }

    // 3. send mail
    try {
        const response = await transporter.sendMail(mailOption);
        console.log("Email send successfull");

    } catch (error) {
        console.log("Email send failed", error);
    }
}



