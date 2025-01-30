import express from "express";
import { addProduct, addService, getAppointments, getProducts } from "../controllers/admin _controller.js";
import { getCustomers } from "../controllers/admin _controller.js";
import { getEmployees } from "../controllers/admin _controller.js";
import { getServices } from "../controllers/admin _controller.js";
import { getBranches } from "../controllers/admin _controller.js";
import { getTodayAppointments } from "../controllers/admin _controller.js";
import { getManagers } from "../controllers/admin _controller.js";

export const adminRoute = express.Router();

adminRoute.get("/getCustomers", getCustomers);
adminRoute.get("/getEmployees", getEmployees);
adminRoute.get("/getManagers", getManagers);
adminRoute.get("/getServices", getServices);
adminRoute.post("/addService", addService);
adminRoute.get("/getProducts", getProducts);
adminRoute.post("/addProduct", addProduct)
adminRoute.get("/getAppointments", getAppointments);
adminRoute.get("/getBranches", getBranches);
adminRoute.get("/getTodayAppointments", getTodayAppointments);
