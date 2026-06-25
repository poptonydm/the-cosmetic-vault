import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    clientName: {type: String, required: true},
    notes: {type: String},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    serviceName:{type: String, required: true},
    total:{type: Number, required: true},
    stylist: {type: String,},
    image: {type: String,},
    status: {type: String, default: "pending"},
},{timestamps: true},)

const orderModel = mongoose.models.luxeglowservices || mongoose.model('luxeglowservices', ordersShema);

export default orderModel;