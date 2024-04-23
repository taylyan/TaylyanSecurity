import express from 'express'
const router = express.Router();
import { sendEmail, scheduleEmails } from '../services/emailService.js'; // Your email service for sending notifications
import { User } from '../models/User.js';
import axios from "axios";
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import {verifyUser} from './auth.js'

const getEmailRecipients = async () => {
    try {
        // Find all users and select only the 'email' field
        const users = await User.find({}).select('email');
        
        // Extract email addresses from the users
        const emailAddresses = users.map(user => user.email);
        
        return emailAddresses;
    } catch (error) {
        console.error('Error fetching recipients:', error);
        return []; // Return an empty array or handle the error appropriately
    }
};


// POST route to handle mode selection
router.post('/mode-selection', async (req, res) => {
    const { mode } = req.body; //userId
    const recipients = await getEmailRecipients();
    //const recipients = 'taylanmitev19b1@gmail.com'
    //res.json({ message: `Mode  activated. No action taken.` });

    //sendEmail(recipients, 'Test Email', '<p>This is a test email.</p>');
    try {
        //const recipients = await getEmailRecipients(userId);
        console.log('stiga') //stiga do tuk
        //const userEmail = req.user.email ;
        switch (mode) {
            case "Don't Disturb":
                sendEmail(recipients, 'Режимът „Не безпокойте“ е активиран', 'Проверете профила си за сигурност за промени!');       
                res.json({ message: `Mode ${mode} activated. Email sent.` });                
                // Send email
                break;
            case "Balanced":
                sendEmail(recipients, 'Активиран балансиран режим', 'Проверете профила си за сигурност за промени!');       

                scheduleEmails(mode);
                res.json({ message: `Mode ${mode} activated. Emails will be sent every 5 hours.` });
                break;
            case "Active":
                sendEmail(recipients, 'Активен режим Активиран', 'Проверете профила си за сигурност за промени!');       
                scheduleEmails(mode);
                res.json({ message: `Mode ${mode} activated. Emails will be sent every hour.` });
                break;
            default:
                res.status(400).json({ message: `Invalid mode: ${mode}` });
        }
    } catch (error) {
        console.error('Error handling mode selection:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export {router as emailRouter, getEmailRecipients}