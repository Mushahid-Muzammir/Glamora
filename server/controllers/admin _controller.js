import { db } from "../server.js";
import Managers from "../models/Manager.model.js";
import Employees from "../models/Employee.model.js";
import Products from "../models/Product.model.js";
import Services from "../models/Service.model.js"


export const getBranches = (req, res) => {
  try {
    const query = "SELECT * FROM branches";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Branches Found");
      }
      const branches = results;
      console.log(branches);
      return res.status(200).json({ branches });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const getCustomers = (req, res) => {
  try {
    const query = "SELECT u.user_id, u.name, u.contact, u.email, c.loyalty_points FROM users u JOIN customers c ON u.user_id = c.user_id";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Users Found");
      }
      const customers = results;
      console.log(customers);
      return res.status(200).json({customers: customers });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const getProducts = (req, res) => {
  try {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Products Found");
      }
      const products = results;
      console.log(products);
      return res.status(200).json({ products: products });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const addProduct = async (req, res) => {
  try{
    const product = await Products.create(
      {
        image_path : '',
        product_name: req.body.name,
        description: req.body.description,
        cost_price: req.body.cost_price,
        selling_price: req.body.selling_price,
        stock_level: req.body.stock,
        expiry_date: req.body.expiry_date
      });
      if(product)
      {
        return res.status(201).send({message:"New product added!"});
      }else{
        return res.status(500).send({message: "Operation failed!"});
      }

  }catch(error){
      return res.status(400).send(error instanceof Error ? error.message : "Unknown error");
  }
}

export const getEmployees = (req, res) => {
  try {
    const query = "SELECT u.user_id, u.name, u.contact, u.email, e.employee_id, e.salary, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Employees Found");
      }
      const employees = results;
      console.log(employees);
      return res.status(200).json({employees: employees });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const addEmployee = (req, res) => {
  try{

  }catch{

  }
}

export const getManagers = (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role = 'manager'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Managers Found");
      }
      const managers = results;
      console.log(managers);
      return res.status(200).json({ managers });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
}

export const getServices = (req, res) => {
  try {
    const query = "SELECT * FROM services";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("No Services Found");
      }
      const services = results;
      console.log(services);
      return res.status(200).json({ services: services });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const addService = async (req, res) => {
  try{
    const service = await Services.create(
      {
        service_name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration
      });
      if(service){
      return res.status(201).send({message: "Created new employee"})
      }else{
      return res.status(500).send({message: "Failed to create employee"});
      }
  }catch(error){
    res.status(400).send(error instanceof Error ? error.message : "Unknown error");
  }
}

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

export const getAppointments = (req, res) => {
  try {
    const query = "SELECT * FROM appointments";
    db.query(query, (err, results) => {
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
