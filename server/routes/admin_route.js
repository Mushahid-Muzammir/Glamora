import express from "express";
import {upload}  from "../controllers/img_controller.js"
import { addProduct, addService, getAppointments, getProductById, getProducts, updateProduct, updateService, getServiceById, getEmployeeById, updateEmployee, getEmployeeServices, addBranch, addManager, getBranchById, updateBranch, getManagerById, updateManager, addEmployee, getRequests, updateRequest, cancelAppointment, getTodaySales, getTodayRevenueByServices, getAppointmentDetailsById, deleteBranch, getAppointmentCountByService, getAppointmentCountByBranch } from "../controllers/admin _controller.js";
import { getCustomers } from "../controllers/admin _controller.js";
import { getEmployees } from "../controllers/admin _controller.js";
import { getServices } from "../controllers/admin _controller.js";
import { getBranches } from "../controllers/admin _controller.js";
import { getTodayAppointments } from "../controllers/admin _controller.js";
import { getManagers } from "../controllers/admin _controller.js";

export const adminRoute = express.Router();

adminRoute.get("/getCustomers", getCustomers);
adminRoute.put("/editCustomer/:id");
adminRoute.get("/getEmployees", getEmployees);
adminRoute.post("/addEmployee", addEmployee);
adminRoute.put("/editEmployee/:user_id", updateEmployee);
adminRoute.get("/getEmployeeById/:user_id", getEmployeeById);
adminRoute.get("/getEmployeeServices/:employee_id", getEmployeeServices);
adminRoute.get("/getManagers", getManagers);
adminRoute.get("/getManagerById/:user_id", getManagerById);
adminRoute.put("/editManager/:user_id", updateManager);
adminRoute.post("/addManager", addManager);
adminRoute.get("/getServices", getServices);
adminRoute.get("/getServiceById/:service_id", getServiceById);
adminRoute.post("/addService", addService);
adminRoute.put("/editService/:service_id", updateService);
adminRoute.get("/getProducts", getProducts);
adminRoute.get("/getProductById/:product_id", getProductById);
adminRoute.post("/addProduct", upload.single('image_url'), addProduct);
adminRoute.put("/editProduct/:product_id", updateProduct);
adminRoute.get("/getBranches", getBranches);
adminRoute.post("/addBranch", addBranch);
adminRoute.get("/getBranchById/:branch_id", getBranchById);
adminRoute.put("/editBranch/:branch_id", updateBranch);
adminRoute.get("/getAppointments", getAppointments);
adminRoute.get("/getTodayAppointments", getTodayAppointments);
adminRoute.put("/cancelAppointment/:appointment_id", cancelAppointment);
adminRoute.put("/editAppointment/:appointment_id");
adminRoute.get("/getAppointmentDetailsById/:appointment_id", getAppointmentDetailsById); 
adminRoute.get("/getRequests", getRequests);
adminRoute.put("/updateStatus/:leave_id", updateRequest);
adminRoute.get("/getTodaySales", getTodaySales);
adminRoute.get("/getTodayRevenueByServices", getTodayRevenueByServices);
adminRoute.delete("/deleteBranch/:branch_id", deleteBranch);
adminRoute.get("/getAppointmentCountByService", getAppointmentCountByService);
adminRoute.get("/getAppointmentCountByBranch", getAppointmentCountByBranch);

