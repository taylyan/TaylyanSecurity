import express from 'express'
import { Admin } from '../models/Admin.js';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
    const {username, password, role} = req.body;
    if(role === 'admin') {
        const admin = await Admin.findOne({username})
        if(!admin) {
            return res.json({message: "admin not registered"})
        }
        const validPassword = await bcrypt.compare(password, admin.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'admin'})
    } else if(role === 'user') {
        const user = await User.findOne({username})
        if(!user) {
            return res.json({message: "user not registered"})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({username: user.username, role: 'user'}, process.env.User_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'user'})
    } else {

    }
    } catch(er) {
        res.json(er)
    }
})

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid Admin"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                return res.json({message: "Invalid token"})
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid User"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                jwt.verify(token, process.env.User_Key, (err, decoded) => {
                    if(err) {
                        return res.json({message: "Invalid token"})
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        //req.userId = decoded.userId; // Add userId extraction
                        //req.userEmail = decoded.userEmail; // Add userEmail extraction
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

router.get('/verify',verifyUser, (req, res) => {
    return res.json({login: true, role: req.role})
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({logout : true})
})

export {router as AdminRouter, verifyAdmin, verifyUser}