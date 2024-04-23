import express from 'express'
import { User } from '../models/User.js';
import bcrypt from 'bcrypt'
const router = express.Router();
//import { verifyAdmin } from './auth.js';

router.post('/register', async (req, res) => {
    try {
        const {username, password, email} = req.body;
        const user = await User.findOne({username})
        if(user) {
            return res.json({message: "user is registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newuser = new User({
            username,
            password: hashPassword,
            email
        })
        await newuser.save()
        return res.json({registered: true})
    } catch(err) {
        return res.json({message: "Error in registring user"})
    }
})

export {router as userRouter}