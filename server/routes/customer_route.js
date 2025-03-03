import express from 'express';
import { confirmBooking, getAvailableSlots, getBranchById, getBranches, getCustomerbyId, getEmployeesbyBranch, getEmployeeServices, getProducts, getServiceDuration, getServices } from '../controllers/customer_controller.js';

export const customerRoute = express.Router();

customerRoute.get("/getProducts", getProducts);
customerRoute.get("/getServices", getServices);
customerRoute.get("/getBranches", getBranches);
customerRoute.get("/getEmployees/:branch_id", getEmployeesbyBranch);
customerRoute.get("/getCustomerbyId/:user_id", getCustomerbyId);
customerRoute.get("/getBranchById/:branch_id", getBranchById);
customerRoute.get("/getDuration", getServiceDuration);
customerRoute.get("/getAvailableSlots", getAvailableSlots);
customerRoute.post("/confirmBooking", confirmBooking);
customerRoute.post("/sales")
customerRoute.get("/getEmployeeServices/:employee_id", getEmployeeServices);


