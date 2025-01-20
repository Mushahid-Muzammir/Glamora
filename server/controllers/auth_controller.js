import { db } from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET

export const login = async (req, res) => 
{
   try{
    const {email, password} = req.body;
   const query  = "SELECT * FROM users WHERE email = ?";
   db.query(query, [email], async(err, result) => {
    if(err)
    {
        return res.status(500).send(err);
    }
    if(res.length === 0)
    {
        return res.status(404).send({message:"User not found"});
    }

    const user = result[0];
    const pwMatch = await bcrypt.compare(password, user.password);
    if(!pwMatch)
    {
        return res.status(404).send({message:"Username and Password not match"});
    }
    const token = jwt.sign({email: user.email}, SECRET_KEY, {expiresIn: "1h"});
    console.log(token);
    return res.status(200).send({token: token});
   }) 

   }catch{
    console.error("Error during login:", error);
        return res.status(500).send("Server error")
   }
}

export const register = async (req, res) => 
{
    console.log("Reached Backend:",req.body);
    const { name, contact, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, contact, email, password) VALUES (?,?,?,?)";
    db.query(query, [name, contact, email, hashedPassword], (err, result) => {
        if(err)
        {
            if(err === "ER_DUP_ENTRY")
            {
                return res.status(400).send({message: "Email already exists"});
            }
        }
        return res.status(200).send({message:"User registered Sucessfully"});
    })
    }
    catch (error) {
        return res.status(500).send({ message: "Error processing request", error });
    }
}

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token)
    {
        return res.status(403).send({message: "JWT access denied"});
    }
    jwt.verify(token, SECRET_KEY, (err, result) => {
        if(err)
        {
            return res.status(401).send({message: "Unauthorized Access"});
        }
        req.user = result;
        next();
    })

}