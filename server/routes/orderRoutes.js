import express from 'express';
import { createConsult, createOrder, createOrderA, deleteConsult, deleteOrder, deleteOrderA, getAppointmentDataIndividual, getConsultData, getOrderData, getOrderDataA, getOrderDataIndividual, updateConsult, updateOrder, updateOrderA } from '../controllers/orderControllers.js';

const orderRouter = express.Router();

orderRouter.get('/io-data', getOrderDataIndividual);
orderRouter.get('/ia-data', getAppointmentDataIndividual);
orderRouter.get('/data', getOrderData);
orderRouter.get('/c-data', getConsultData);
orderRouter.get('/a-data', getOrderDataA);
orderRouter.post('/create-order', createOrder);
orderRouter.post('/create-orderA', createOrderA);
orderRouter.post('/consult', createConsult);
orderRouter.put('/update-order', updateOrder);
orderRouter.put('/update-consult', updateConsult);
orderRouter.put('/update-orderA', updateOrderA);
orderRouter.post('/delete-order', deleteOrder);
orderRouter.post('/delete-consult', deleteConsult);
orderRouter.post('/delete-orderA', deleteOrderA);

export default orderRouter;