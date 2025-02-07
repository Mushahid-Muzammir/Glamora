import express from 'express';
import { confirmBooking, getAvailableSlots, getBranches, getCustomerbyId, getProducts, getServiceDuration, getServices } from '../controllers/customer_controller.js';

export const customerRoute = express.Router();

customerRoute.get("/getProducts", getProducts);
customerRoute.get("/getServices", getServices);
customerRoute.get("/getBranches", getBranches);
customerRoute.get("/getCustomerbyId", getCustomerbyId);
customerRoute.get("/getDuration", getServiceDuration);
customerRoute.get("/getAvailableSlots", getAvailableSlots);
customerRoute.post("/confirmBooking", confirmBooking);


