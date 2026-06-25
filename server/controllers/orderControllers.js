import consultModel from "../models/consultationModel.js";
import orderAModel from "../models/orderAModel.js";
import orderModel from "../models/orderModel.js";


export const getOrderDataIndividual = async (req, res) => {
  try {

    const orderId = req.query.orderId

    const order = await orderAModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "No orders found!" });
    }

    return res.json({ success: true, data:order });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get orders' });
  }
}

export const getAppointmentDataIndividual = async (req, res) => {
  try {

    const orderId = req.query.orderId

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "No appointments found!" });
    }

    return res.json({ success: true, data:order });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get appointments' });
  }
}

//service booking
export const createOrderA = async (req, res) => {
  try {
    const { date, time, notes, serviceName, total, stylist, image } = req.body.orderData;
    //const { addons } = req.body.orderData.service;
    const { name, email, phone } = req.body.orderData.customer;
    const clientName = name;

    // Validate required fields
    if (!clientName || !email || !phone || !date || !time || !serviceName || !total) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }
    const order = new orderModel({ clientName, email, phone, date, time, notes, serviceName, total, stylist, image });
    await order.save();

    return res.json({ success: true, message: "Appointment successfully created", data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrderA = async (req, res) => {
  let updatedOrder;
  
  try {
    const { appointmentId, status, date, time } = req.body;

    if(!date){
      updatedOrder = await orderModel.findByIdAndUpdate(appointmentId,{ status },{ new: true });
      if (!updatedOrder) {
        return res.json({ success: false, message: 'Order not found' });
      }
      return res.json({ success: true, product: updatedOrder });
    }

    updatedOrder = await orderModel.findByIdAndUpdate(appointmentId,{ status, date, time },{ new: true });
    if (!updatedOrder) {
      return res.json({ success: false, message: 'Order not found' });
    }
    return res.json({ success: true, product: updatedOrder });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to update order' });
  }
}

export const deleteOrderA = async (req, res) => {

    const { orderId } = req.body

  try {
    await orderModel.deleteOne({ _id: orderId });
    return res.json({ success: true, message: "Appointment Deleted!" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to delete appointment' });
  }
}

export const getOrderDataA = async (req, res) => {
  try {
    const appointments = await orderModel.find();

    if (!appointments.length) {
      return res.json({ success: false, message: "No appointments found!" });
    }

    return res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get appointments' });
  }
}

//consult
export const createConsult = async (req, res) => {
  try {
    const { name, email, phone, message, orderNumber, subject } = req.body.formData;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }

    if (!orderNumber) {
      const consult = new consultModel({name, email, phone, message, subject});
      await consult.save();
      return res.json({ success: true, message: "Inquirery Sent", data: consult._id });
    }else{
      const consult = new consultModel({name, email, phone, message, orderNumber, subject});
      await consult.save();
      return res.json({ success: true, message: "Inquirery Sent", data: consult._id });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const updateConsult = async (req, res) => {
  let updatedConsult;
  
  try {
    const { consultId,status } = req.body;

    updatedConsult = await consultModel.findByIdAndUpdate(consultId,
        { status },
        { new: true });
    

    if (!updatedConsult) {
      return res.json({ success: false, message: 'Consult not found' });
    }

    return res.json({ success: true, consult: updatedConsult });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to update Consult' });
  }
}

export const getConsultData = async (req, res) => {
  try {
    const consults = await consultModel.find();

    if (!consults.length) {
      return res.json({ success: false, message: "No consults found!" });
    }

    return res.json({ success: true, consults });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get cunsult' });
  }
}

export const deleteConsult = async (req, res) => {

  const { consultId } = req.body

  try {
    await consultModel.deleteOne({ _id: consultId });
    return res.json({ success: true, message: "consult Deleted!" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to delete consult' });
  }
}


//product order
export const createOrder = async (req, res) => {

  try {
    const { customer, items, total, paymentRef } = req.body.orderData;
    const { name, email, phone, address } = customer;
    const { price, quantity, color, size, image } = items[0];
    const customerName = name;
    const itemName = items[0].name
    
    // Validate required fields
    if (!customerName || !email || !phone || !address || !itemName || !price || !quantity || !total || !paymentRef || !image) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }
    
    const order = new orderAModel({ customerName, email, phone, address, itemName, price, quantity, total, paymentRef, color, size, image });
    await order.save();

    return res.json({ success: true, message: "Order successfully created", data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrder = async (req, res) => {
  let updatedOrder;
  
  try {
    const { orderId,status } = req.body;

    updatedOrder = await orderAModel.findByIdAndUpdate(orderId,
        { status },
        { new: true });
    

    if (!updatedOrder) {
      return res.json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, product: updatedOrder });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to update order' });
  }
}

export const deleteOrder = async (req, res) => {

    const { orderId } = req.body

  try {
    await orderModel.deleteOne({ _id: orderId });
    return res.json({ success: true, message: "Order Deleted!" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to delete order' });
  }
}

export const getOrderData = async (req, res) => {
  try {
    const orders = await orderAModel.find();

    if (!orders.length) {
      return res.json({ success: false, message: "No orders found!" });
    }

    return res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get orders' });
  }
}