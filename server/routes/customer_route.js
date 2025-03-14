import express from 'express';
import { confirmBooking, getAvailableSlots, getBranchById, getBranches, getCustomerbyId, getEmployeeById, getEmployeesbyBranch, getEmployeeServices, getProducts, getServiceDetails, getServices, getSpecialServices } from '../controllers/customer_controller.js';

export const customerRoute = express.Router();

customerRoute.get("/getProducts", getProducts);
customerRoute.get("/getServices", getServices);
customerRoute.get("/getBranches", getBranches);
customerRoute.get("/getEmployees", getEmployeesbyBranch);
customerRoute.get("/getCustomerbyId/:user_id", getCustomerbyId);
customerRoute.get("/getBranchById/:branch_id", getBranchById);
customerRoute.get("/getServiceDetails", getServiceDetails);
customerRoute.get("/getAvailableSlots", getAvailableSlots);
customerRoute.post("/confirmBooking", confirmBooking);
customerRoute.post("/sales");
customerRoute.get("/getEmployeeServices/:employee_id", getEmployeeServices);
customerRoute.get("/getEmployeeById/:employee_id", getEmployeeById);
customerRoute.get("/getSpecialServices", getSpecialServices);


