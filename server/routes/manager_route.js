import express from "express"
import { getAppointmentsByBranch, getBranchById, getCustomers, getEmployeesByBranch, getProducts, getServices } from "../controllers/manager_controller.js";


export const managerRoute = express.Router();

managerRoute.get("/getCustomers", getCustomers);
managerRoute.get("/getAppointments/:branch_id", getAppointmentsByBranch);
managerRoute.get("/getEmployees/:branch_id", getEmployeesByBranch);
managerRoute.get("/getProducts", getProducts);
managerRoute.get("/getServices", getServices);
managerRoute.get("/getBranchById/:user_id", getBranchById)


