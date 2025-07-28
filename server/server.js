import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mysql from "mysql2/promise"; 
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user_route.js";
import { adminRoute } from "./routes/admin_route.js";
import { customerRoute } from "./routes/customer_route.js";
import  { managerRoute } from "./routes/manager_route.js"
import { staffRoute } from "./routes/staff_route.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "glamora2",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log("MySQL Database Connected Successfully"))
    .catch(err => console.error("MySQL Connection Failed:", err));

app.use("/auth", userRouter);
app.use("/admin", adminRoute);
app.use("/client", customerRoute);
app.use("/manager", managerRoute);
app.use("/staff", staffRoute);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
