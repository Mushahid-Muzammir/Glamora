import express from "express"
import { getAppointments, getEmployeeById, updateStatus, requestLeave } from "../controllers/staff_controller.js";

export const staffRoute = express.Router();

staffRoute.get("/getAppointments/:employee_id", getAppointments);
staffRoute.get("/getEmployeeById/:user_id", getEmployeeById);
staffRoute.put("/updateStatus/:appointment_id", updateStatus);
staffRoute.post("/requestLeave/:employeeId", requestLeave);
