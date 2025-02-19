import express from "express";
import { addProduct, addService, getAppointments, getProductById, getProducts, updateProduct, updateService, getServiceById, getEmployeeById, updateEmployee, getEmployeeServices, addBranch, addManager, getBranchById, updateBranch, getManagerById, updateManager, addEmployee } from "../controllers/admin _controller.js";
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
adminRoute.post("/addProduct", addProduct);
adminRoute.put("/editProduct/:product_id", updateProduct);
adminRoute.get("/getAppointments", getAppointments);
adminRoute.get("/getBranches", getBranches);
adminRoute.post("/addBranch", addBranch);
adminRoute.get("/getBranchById/:branch_id", getBranchById);
adminRoute.put("/editBranch/:branch_id", updateBranch);
adminRoute.get("/getTodayAppointments", getTodayAppointments);
