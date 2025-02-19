import  { db } from "../server.js";
import { Services } from '../models/Service.model.js';
import { Products } from '../models/Product.model.js';
import bcrypt from "bcrypt";

  export const getCustomers = async (req, res) => {
    try {
      const query =
        "SELECT u.user_id, u.name, u.contact, u.email, c.loyalty_points FROM users u JOIN customers c ON u.user_id = c.user_id";
      const [results] = await db.execute(query);
      if (results.length === 0) {
        return res.status(404).send("No Customers Found");
      }
      return res.status(200).json({ customers: results });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  export const getProducts = async (req, res) => {
    try {
      const query = "SELECT * FROM products";
      const [results] = await db.execute(query);
      if (results.length === 0) {
        return res.status(404).send("No Products Found");
      }
      return res.status(200).json({ products: results });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  export const addProduct = async (req, res) => {
    try {
      console.log("Received Body:", req.body);
      const product = await Products.create({
        image_path: "",
        product_name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        selling_price: req.body.selling_price,
        stock_level: req.body.stock,
        branch_id: req.body.branch,
        expiry_date: req.body.expiry_date,
      });
      if (product) {
        return res.status(201).send({ message: "Created new service" });
      } else {
        return res.status(500).send({ message: "Failed to create service" });
      }    
    } catch (error) {
      return res.status(400).send(error.message || "Unknown error");
    }
  };

  export const getServices = async (req, res) => {
    try {
      const query = "SELECT * FROM services";
      const [results] = await db.execute(query);
      if(results.length ===0){
          return res.status(404).send("No Services Found");
    } 
      const services = results;
      return res.status(200).json({ services : services });
        }catch (error) {
      console.error("Unexpected Error:", error);
      return res.status(500).send("An error occurred: " + error.message);
    }
  };

  export const addService = async (req, res) => {
    try {
      const service = await Services.create({
        service_name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
      });
      if (service) {
        return res.status(201).send({ message: "Created new service" });
      } else {
        return res.status(500).send({ message: "Failed to create service" });
      }
    } catch (error) {
      res
        .status(400)
        .send(error instanceof Error ? error.message : "Unknown error");
    }
  };

  export const getBranchById = async (req, res) => {
    try{
      const user_id = req.params.user_id;
      const query = "SELECT u.user_id, m.manager_id, b.branch_id FROM USERS u JOIN MANAGERS m ON u.user_id = m.user_id JOIN BRANCHES b ON m.manager_id = b.manager_id WHERE u.user_id = ?";
      const [result] = await db.execute(query, [user_id]);
      if (result.length === 0) {
        return res.status(404).send("Manager Not Found");
      }
      const manager = result[0];
      console.log(manager);
      return res.status(200).json({ manager : manager });
    }catch(error){
      console.error("Database Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  export const getEmployeesByBranch = async (req, res) => {
    try{
      const branch_id = req.params.branch_id;
    const query =
      "SELECT u.user_id, u.name, u.email, u.contact, e.employee_id, e.salary FROM users u JOIN employees e ON u.user_id = e.user_id WHERE e.branch_id = ?;";
    const [result] = await db.execute(query, [branch_id]);
    if (result.length === 0) {
      return res.status(404).send("Employees Not Found");
    }
    const employees = result;
    console.log(employees);
    return res.status(200).json({ employees : employees });
    }catch{
      console.error("Database Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  export const getTodayAppointments = (req, res) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const query = "SELECT * FROM appointments WHERE date = CURDATE()";
      db.query(query, currentDate, (err, results) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).send("Internal Server Error");
        }
        if (results.length === 0) {
          return res.status(404).send("No Appointments Found");
        }
        const appointments = results;
        console.log(appointments);
        return res.status(200).json({ appointments });
      });
    } catch (error) {
      console.error("Unexpected Error:", error);
      return res.status(500).send("An error occurred: " + error.message);
    }
  };
  
  export const getAppointmentsByBranch = async (req, res) => {
    try {
    const branch_id = req.params.branch_id;
      const [results] = await db.execute("SELECT a.appointment_id, u.name, u.contact, b.branch_name, a.start_time, a.end_time, a.service_status, a.payment_mode, a.payment_status FROM appointments a JOIN branches b ON a.branch_id = b.branch_id JOIN customers c ON a.customer_id = c.customer_id JOIN users u ON c.user_id = u.user_id WHERE a.branch_id = ?", [branch_id]);
      if (results.length === 0) {
        return res.status(404).send("No Appointments Found");
      }
      return res.status(200).json({ appointments: results });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  export const addEmployee = async (req, res) => {
    try {
      const hashed_password = await bcrypt.hash("glamora123", 10);
  
      console.log("Received data: ", req.body)
  
      const employee = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        branch : req.body.branch, 
        salary: req.body.salary,
      };
  
      const userInsertQuery = `
        INSERT INTO users (name, contact, role, email, password) 
        VALUES (?, ?, ?, ?, ?)`;
  
      const [userResult] = await db.execute(userInsertQuery, [
        employee.name,
        employee.contact,
        'staff',
        employee.email,
        hashed_password,
      ]);
  
      const userId = userResult.insertId;
  
      const employeeInsertQuery = `
        INSERT INTO employees (user_id, branch_id, salary) 
        VALUES (?, ?, ?)`;
  
    const [result] =   await db.execute(employeeInsertQuery, [userId, employee.branch, employee.salary]);
  
      res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ error: 'Failed to add employee' });
    }
  };