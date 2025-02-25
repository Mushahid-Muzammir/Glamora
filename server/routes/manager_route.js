import express from "express"
import { addEmployee, addProduct, getAppointmentsByBranch, getBranchById, getCustomers, getEmployeesByBranch, getProducts, getServices, getRequests, updateRequest, getTodayAppointments } from "../controllers/manager_controller.js";
import { addService } from "../controllers/admin _controller.js";


export const managerRoute = express.Router();

managerRoute.get("/getCustomers", getCustomers);
managerRoute.get("/getAppointments/:branch_id", getAppointmentsByBranch);
managerRoute.get("/getTodayAppointments/:branch_id", getTodayAppointments);
managerRoute.get("/getEmployees/:branch_id", getEmployeesByBranch);
managerRoute.get("/getProducts", getProducts);
managerRoute.get("/getServices", getServices);[]
managerRoute.get("/getBranchById/:user_id", getBranchById);
managerRoute.post("/addEmployee", addEmployee);
managerRoute.post("/addService", addService);
managerRoute.post("/addProduct", addProduct);
managerRoute.get("/getRequests/:branch_id", getRequests);
managerRoute.put("/updateStatus/:leave_id", updateRequest);


