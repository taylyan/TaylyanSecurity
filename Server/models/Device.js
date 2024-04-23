import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description : {type: String},
    channel: {type: String, required: true},
    chart: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const deviceModel = mongoose.model('Device', deviceSchema)
export {deviceModel as Device}