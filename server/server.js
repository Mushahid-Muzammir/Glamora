import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./controllers/auth_controller.js";
import {userRouter} from "./routes/user_route.js"
import { adminRoute } from "./routes/admin_route.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});

export const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "glamora"
    }
);

db.connect( (err) => {
    if(err)
    {
        console.error("Database Connection failed");
        return
    }
    console.log("Database Connected Successfully");
})

app.use("/auth", userRouter);
app.use("/admin", adminRoute);
