import nodemailer from 'nodemailer';
import config from '../../../config';

export async function sendEmail(
    email: string,
    html: string
) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.email,
            pass: config.app_pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: config.email, // sender address
        to : email, // list of receivers
        subject: "Reset Password Link", // Subject line
        html, // html body
    });

    console.log("Email sent", info.messageId)
}