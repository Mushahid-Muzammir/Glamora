import { db } from "../server.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => 
{
   const {email, password} = req.body;
   const query  = "SELECT * FROM users from email = ?";
   db.query(query, [email], async(err, res) => {
    if(err)
    {
        return res.status(500).send(err);
    }
    if(res.lenght === 0)
    {
        return res.status(404).send("User not found");
    }

    const user = res[0];
    const pwMatch = await bcrypt.compare(password, user.password);
    if(!pwMatch)
    {
        return res.status(404).send("Username and Password not match");
    }
   }) 
}

export const register = async (req, res) => 
{
    console.log("Reached Backend:",req.body);
    const { name, contact, email, password } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, contact, email, password) VALUES (?,?,?,?)";
    db.query(query, [name, contact, email, hashedPassword], (err, result) => {
        if(err)
        {
            if(err === "ER_DUP_ENTRY")
            {
                return res.status(400).send("Email already exists");
            }
        }
        return res.status(200).send({message:"User registered Sucessfully"});
    })
}