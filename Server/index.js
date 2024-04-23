import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import './db.js'
import nodemailer from 'nodemailer'
import { AdminRouter } from './routes/auth.js'
import { userRouter } from './routes/user.js'
import { deviceRouter } from './routes/device.js'
import { emailRouter } from './routes/modeRoutes.js'
import { Device } from './models/Device.js'
import { User } from './models/User.js'
import { Admin } from './models/Admin.js'
import { apiRouter } from './routes/thingspeakApi.js'
import { sendEmail } from './services/emailService.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }));

dotenv.config()
app.use('/auth', AdminRouter)
app.use('/user', userRouter)
app.use('/device', deviceRouter)

app.use('/api/thingspeak', apiRouter);


app.use('/email', emailRouter)

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'taylyanprotection@gmail.com',
            pass: 'vktj ujfl gcwk esao'
        }
    });

    const mailOptions = {
        from: 'taylyanprotection@gmail.com',
        to: 'taylyanprotection@gmail.com', // Replace with your recipient email address
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Message sent successfully');
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
});

app.post("/api/sendemail", async (req, res) => {
    const { email } = req.body;

    try {
        const send_to = email;
        const subject = "Thank You Message From NodeCourse";
        const message = `
          <h3>Hello Zino</h3>
          <p>Thank for your YouTube Tutorials</p>
          <p>Regards...</p>
      `;

        await sendEmail(send_to, subject, message,);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.get('/dashboard', async (req, res) => {
    try {
        const user = await User.countDocuments()
        const admin = await Admin.countDocuments()
        const device = await Device.countDocuments()
        return res.json({ ok: true, user, device, admin })
    } catch (err) {
        return res.json(err)
    }
})


app.listen(process.env.PORT, () => {
    console.log("Server is Running" + process.env.PORT);
})