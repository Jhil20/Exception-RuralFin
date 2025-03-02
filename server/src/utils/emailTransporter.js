import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MAIL_PASSWORD
    }   
})

export default transporter