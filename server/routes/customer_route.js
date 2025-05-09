import express from 'express';
import { confirmBooking, getAvailableSlots, getBranchById, getBranches, getCustomerbyId, getEmployeeById, getServicesByGender, getEmployeeServices, getProducts, getServiceDetails, getServiceEmployees, getServices, getSpecialServiceDetails, getSpecialServices, makeSales, getEmployeeEachService, getBestSellingProducts, getTestimonials, getMyBookings } from '../controllers/customer_controller.js';

export const customerRoute = express.Router();

customerRoute.get("/getProducts", getProducts);
customerRoute.get("/getServices", getServices);
customerRoute.get("/getBranches", getBranches);
customerRoute.get("/getServicesByGender", getServicesByGender);
customerRoute.get("/getCustomerbyId/:user_id", getCustomerbyId);
customerRoute.get("/getBranchById/:branch_id", getBranchById);
customerRoute.get("/getServiceDetails", getServiceDetails);
customerRoute.get("/getAvailableSlots", getAvailableSlots);
customerRoute.post("/confirmBooking", confirmBooking);
customerRoute.post("/sales", makeSales);
customerRoute.get("/getEmployeeServices/:employee_id", getEmployeeServices);
customerRoute.get("/getEmployeeById/:employee_id", getEmployeeById);
customerRoute.get("/getSpecialServices", getSpecialServices);
customerRoute.get("/getSpecialServiceDetails", getSpecialServiceDetails);
customerRoute.get("/getServiceEmployees", getServiceEmployees);
customerRoute.get("/getEmployeeEachService", getEmployeeEachService);
customerRoute.get("/getBestSellingProducts", getBestSellingProducts);
customerRoute.get("/getTestimonials", getTestimonials);
customerRoute.get("/getMyBookings/:customer_id", getMyBookings);



