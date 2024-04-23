import express from 'express'
import { Device } from '../models/Device.js';
const router = express.Router();
//import { verifyAdmin } from './auth.js';

router.post('/add', async (req, res) => {
    try {
        const { name, description, channel, chart } = req.body;
        const newdevice = new Device({
            name,
            description,
            channel,
            chart
        })
        await newdevice.save()
        return res.json({ added: true })
    } catch (err) {
        return res.json({ message: "Error in adding device" })
    }
})

router.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find()
        return res.json(devices)
    } catch (err) {
        return res.json(err)
    }
})

router.get('/device/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const device = await Device.findById({ _id: id })
        return res.json(device)
    } catch (err) {
        return res.json(err)
    }
})
router.put('/device/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const device = await Device.findByIdAndUpdate({ _id: id }, req.body)
        return res.json({ updated: true, device })
    } catch (err) {
        return res.json(err)
    }
})

router.delete('/device/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const device = await Device.findByIdAndDelete({ _id: id })
        return res.json({ deleted: true, device })
    } catch (err) {
        return res.json(err)
    }
})

export { router as deviceRouter }