import { db } from "../server.js";
import Managers from "../models/Manager.model.js";
import Employees from "../models/Employee.model.js";
import Products from "../models/Product.model.js";
import Services from "../models/Service.model.js";

export const getBranches = async (req, res) => {
  try {
    const query =
      "SELECT b.branch_id, b.branch_name, b.address, b.manager_id, b.contact, b.open_time, b.close_time, u.name, u.user_id FROM branches b JOIN managers m ON b.manager_id = m.manager_id JOIN users u ON m.user_id = u.user_id";
    const [results] = await db.execute(query);
    if (results.length === 0) {
      return res.status(404).send("No Customers Found");
    }
    return res.status(200).json({ branches: results });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

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

export const getCustomerById = async (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "SELECT u.user_id, u.name, u.contact, c.loyalty_points FROM users u JOIN customers c ON u.user_id = c.user_id WHERE u.user_id = ?;";
  const [results] = await db.execute(query);
  if (results.length === 0) {
    return res.status(404).send("Customer Not Found");
  }
  return res.status(200).json({ customer: results });
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
    const product = await Products.create({
      image_path: "",
      product_name: req.body.name,
      description: req.body.description,
      cost_price: req.body.cost_price,
      selling_price: req.body.selling_price,
      stock_level: req.body.stock,
      expiry_date: req.body.expiry_date,
    });
    return res.status(201).send({ message: "New product added!" });
  } catch (error) {
    return res.status(400).send(error.message || "Unknown error");
  }
};

export const getProductById = async (req, res) => {
  const product_id = req.params.product_id;
  const query = "SELECT * FROM products WHERE product_id = ?";
  const [result] = await db.query(query, [product_id]);
  if (result.length === 0) {
    return res.status(404).send("Product Not Found");
  }
  const product = result[0];
  console.log(product);
  return res.status(200).json({ product: product });
};

export const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const {
      product_name,
      description,
      cost_price,
      selling_price,
      stock,
      expiry_date,
    } = req.body;
    const query =
      "UPDATE products SET product_name = ?, description = ?, cost_price = ?, selling_price = ?, stock_level = ?, expiry_date = ? WHERE product_id = ?";
    const [result] = await db.execute(query, [
      product_name,
      description,
      cost_price,
      selling_price,
      stock,
      expiry_date,
      product_id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Updated Successfully" });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).send({ error: "Server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const query =
      "SELECT u.user_id, u.name, u.contact, u.email, e.employee_id, e.salary, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id";
    const [results] = await db.execute(query);
    if (results.length === 0) {
      return res.status(404).send("No Employees Found");
    }
    const employees = results;
    console.log(employees);
    return res.status(200).json({ employees: employees });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const addEmployee = (req, res) => {
  try {
  } catch {}
};

export const updateEmployee = (req, res) => {
  const user_id = req.params.user_id;
  const { name, contact, email, branch, salary, services, employee_id } =
    req.body;
  const query =
    "UPDATE users SET name = ?, contact = ?, email = ? WHERE user_id = ?";
  db.query(query, [name, contact, email, user_id], (err, result) => {
    if (err) {
      console.error("Error updating service", err);
      return res.status(500).send({ error: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Service not found" });
    }
  });
  const empQuery =
    "UPDATE employees SET branch_id = ?, salary = ? WHERE user_id = ?";
  db.query(empQuery, [branch, salary, user_id], (err, result) => {
    if (err) {
      console.error("Error updating employee", err);
      return res.status(500).send({ error: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.status(200).send({ message: "Updated Successfully" });
  });

  db.query(
    "DELETE FROM employee_service WHERE employee_id = ?",
    [employee_id],
    (err) => {
      if (err) return res.status(500).json({ error: "Server error" });

      // Insert new services
      const serviceValues = services.map((service_id) => [
        employee_id,
        service_id,
      ]);
      db.query(
        "INSERT INTO employee_service (employee_id, service_id) VALUES ?",
        [serviceValues],
        (err) => {
          // if (err) return res.status(500).json({ error: "Server error" });
          // res.status(200).json({ message: "Employee updated successfully" });
        }
      );
    }
  );
};

export const getEmployeeById = async (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "SELECT u.user_id, u.name, u.email, u.contact, e.employee_id, e.salary, b.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE u.user_id = ?;";
  const [result] = await db.execute(query, [user_id]);
  if (err) {
    console.error("Database Error:", err);
    return res.status(500).send("Internal Server Error");
  }
  if (result.length === 0) {
    return res.status(404).send("Employee Not Found");
  }
  const employee = result[0];
  console.log(employee);
  return res.status(200).json({ employee: employee });
};

export const getEmployeeServices = async (req, res) => {
  const employee_id = req.params.employee_id;
  const query = "SELECT service_id FROM employee_service WHERE employee_id = ?";
  const [results] = await db.execute(query, [employee_id]);
  if (err) {
    console.error("Error fetching services:", err);
    return res.status(500).json({ error: "Server error" });
  }
  res.status(200).json({ services: results });
};

export const getManagers = async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role = 'manager'";
    const [results] = await db.execute(query, (err, results) => {
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
      return res.status(201).send({ message: "Created new employee" });
    } else {
      return res.status(500).send({ message: "Failed to create employee" });
    }
  } catch (error) {
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateService = (req, res) => {
  const service_id = req.params.service_id;
  const { service_name, description, price, duration } = req.body;
  const query =
    "UPDATE services SET service_name = ?, description = ?, price = ?, duration = ? WHERE service_id = ?";
  db.query(
    query,
    [service_name, description, price, duration, service_id],
    (err, result) => {
      if (err) {
        console.error("Error updating service", err);
        return res.status(500).send({ error: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Service not found" });
      }
      res.status(200).send({ message: "Updated Successfully" });
    }
  );
};

export const getServiceById = (req, res) => {
  const service_id = req.params.service_id;
  const query = "SELECT * FROM services WHERE service_id = ?";
  db.query(query, [service_id], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
      return res.status(404).send("Service Not Found");
    }
    const service = results[0];
    console.log(service);
    return res.status(200).json({ service });
  });
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

export const getAppointments = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT a.appointment_id, u.name, u.contact, b.branch_name, a.start_time, a.end_time, a.service_status, a.payment_mode, a.payment_status FROM appointments a JOIN branches b ON a.branch_id = b.branch_id JOIN customers c ON a.customer_id = c.customer_id JOIN users u ON c.user_id = u.user_id");
    if (results.length === 0) {
      return res.status(404).send("No Appointments Found");
    }
    return res.status(200).json({ appointments: results });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
