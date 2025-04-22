import { db } from "../server.js";
import bcrypt from "bcrypt";
import Managers from "../models/Manager.model.js";
import Employees from "../models/Employee.model.js";
import Branches from "../models/Branch.model.js";
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

export const addBranch = async (req, res) => {
  try {
    const branch = await Branches.create({
      branch_name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      manager_id: req.body.manager_id,
      open_time: req.body.open_time,
      close_time: req.body.close_time,
    });
    return res.status(201).send({ message: "New Branch added!" });
  } catch (error) {
    return res.status(400).send(error.message || "Unknown error");
  }
};

export const getBranchById = async (req, res) => {
  try {
    const branch_id = req.params.branch_id;

    const query = "SELECT * FROM branches WHERE branch_id = ?";
    const [result] = await db.execute(query, [branch_id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Branch Not Found" });
    }

    const branch = result[0];

    return res.status(200).json({ branch });
  } catch (error) {
    console.error("Error fetching branch:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const updateBranch = async (req, res) => {
  try {
    const branch_id = req.params.branch_id;
    const {
      branch_name,
      address,
      contact,
      manager_id,
      open_time,
      close_time,
    } = req.body;

    const query = `
      UPDATE branches 
      SET branch_name = ?, address = ?, contact = ?, manager_id = ?, open_time = ?, close_time = ? 
      WHERE branch_id = ?`;

    const [result] = await db.execute(query, [
      branch_name,
      address,
      contact,
      manager_id,
      open_time,
      close_time,
      branch_id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Branch not found" });
    }

    return res.status(200).send({ message: "Branch updated successfully" });
  } catch (error) {
    console.error("Error updating branch", error);
    return res.status(500).send({ error: "Server error" });
  }
};

export const deleteBranch = async (req, res) => {
    try {
        const branch_id = req.params.branch_id;

        const query = "DELETE FROM branches WHERE branch_id = ?";
        const [result] = await db.execute(query, [branch_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Branch not found" });
        }

        return res.status(200).json({ message: "Branch deleted successfully" });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getCustomers = async (req, res) => {
  try {
    const query =
      "SELECT u.user_id, u.name, u.contact, u.email, c.customer_id, c.loyalty_points FROM users u JOIN customers c ON u.user_id = c.user_id";
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
    const imagePath = req.file? `http://localhost:5000/uploads/${req.file.filename}` : "";
    console.log(req.body);
    const product = await Products.create({
      product_name: req.body.name,
      description: req.body.description,
      cost_price: req.body.cost_price,
      selling_price: req.body.selling_price,
      stock_level: req.body.stock,
      expiry_date: req.body.expiry_date,
      branch_id : 1,
      image_url: imagePath
    });
    if (product) {
      res.status(201).send({ message: 'Created a new product', product });
  } else {
      res.status(500).send({ message: "Failed to create a new employee." });
  }  } catch (error) {
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
      stock_level,
      expiry_date,
      image_url
    } = req.body;

    console.log('Received data:', {
      product_id,
      product_name,
      description,
      cost_price,
      selling_price,
      stock_level,
      expiry_date,
      image_url
    });

    if (
      product_name === undefined ||
      cost_price === undefined ||
      selling_price === undefined ||
      stock_level === undefined ||
      product_id === undefined
    ) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const query = `
      UPDATE products 
      SET product_name = ?, description = ?, cost_price = ?, selling_price = ?, stock_level = ?, expiry_date = ?, image_url = ? 
      WHERE product_id = ?`;

    const [result] = await db.execute(query, [
      product_name,
      description,
      cost_price,
      selling_price,
      stock_level,
      expiry_date,
      product_id,
      image_url
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).send({ error: "Server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const query =
      "SELECT u.user_id, u.name, u.contact, u.email, e.image_url, e.employee_id, e.salary, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE e.isActive = 1";
    const [results] = await db.execute(query);
    if (results.length === 0) {
      return res.status(404).send("No Employees Found");
    }
    const employees = results;
    return res.status(200).json({ employees: employees });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
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
      branch_id : req.body.branch,
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

  const [result] =   await db.execute(employeeInsertQuery, [userId, employee.branch_id, employee.salary]);

    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
};

export const updateEmployee = async (req, res) => {
  const user_id = req.params.user_id;
  const { name, contact, email, branch, salary, services, employee_id } = req.body;

  try {
    // Update user details
    const query = "UPDATE users SET name = ?, contact = ?, email = ? WHERE user_id = ?";
    const [result] = await db.execute(query, [name, contact, email, user_id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Update employee details
    const empQuery = "UPDATE employees SET branch_id = ?, salary = ? WHERE user_id = ?";
    const [result2] = await db.execute(empQuery, [branch, salary, user_id]);

    if (result2.affectedRows === 0) {
      return res.status(404).send({ message: "Employee details not updated" });
    }

    // Delete existing services for the employee
    const deleteQuery = "DELETE FROM employee_service WHERE employee_id = ?";
    await db.execute(deleteQuery, [employee_id]);

    // Insert new services for the employee
    if (services.length > 0) {
      const serviceValues = services.map((service_id) => [employee_id, service_id]);
      const insertQuery = "INSERT INTO employee_service (employee_id, service_id) VALUES ?";
      await db.query(insertQuery, [serviceValues]);
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send({ message: "Failed to update employee" });
  }
};

export const getEmployeeById = async (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "SELECT u.user_id, u.name, u.email, u.contact, e.employee_id, e.salary, b.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE u.user_id = ?;";
  const [result] = await db.execute(query, [user_id]);
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
  
  res.status(200).json({ services: results });
};

export const getManagers = async (req, res) => {
  try {
    const query = 
    "SELECT u.user_id, u.name, u.contact, u.email, m.manager_id, m.salary, b.branch_id, b.branch_name FROM users u JOIN managers m ON u.user_id = m.user_id LEFT JOIN branches b ON m.manager_id = b.manager_id WHERE u.role = 'manager'";
    const [results] = await db.execute(query);
    if (results.length === 0) {
      return res.status(404).send("No Managers Found");
    }
      console.log(results);
      return res.status(200).json({ managers : results });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const addManager = async (req, res) => {
  try {
    // Hash the password asynchronously
    const hashed_password = await bcrypt.hash("glamora123", 10);

    const manager = {
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,  // Corrected from req.body.selling_price
      salary: req.body.salary,
    };

    const userInsertQuery = `
      INSERT INTO users (name, contact, role, email, password) 
      VALUES (?, ?, ?, ?, ?)`;

    // Insert into users table
    const [userResult] = await db.execute(userInsertQuery, [
      manager.name,
      manager.contact,
      'manager',
      manager.email,
      hashed_password,
    ]);

    // Get the user ID of the newly created user
    const userId = userResult.insertId;

    // Insert into managers table
    const managerInsertQuery = `
      INSERT INTO managers (user_id, salary) 
      VALUES (?, ?)`;

    await db.execute(managerInsertQuery, [userId, manager.salary]);

    // Return success response
    res.status(201).json({ message: 'Manager added successfully' });
  } catch (error) {
    console.error('Error adding manager:', error);
    res.status(500).json({ error: 'Failed to add manager' });
  }
};

export const getManagerById = async (req, res) => {
  const user_id = req.params.user_id;
  const query =
    "SELECT u.user_id, u.name, u.email, u.contact, m.manager_id, m.salary, b.branch_id, b.branch_name FROM users u JOIN managers m ON u.user_id = m.user_id JOIN branches b ON m.manager_id = b.manager_id WHERE u.user_id = ?";
  const [result] = await db.execute(query, [user_id]);
  if (result.length === 0) {
    return res.status(404).send("Manager Not Found");
  }
  const manager = result[0];
  console.log(manager);
  return res.status(200).json({ manager: manager });
};

export const updateManager = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const {
      name,
      contact,
      email,
      salary,
    } = req.body;
    const query =
      "UPDATE users SET name = ?, contact = ?, email = ? WHERE user_id = ?";
    const [result] = await db.execute(query, [
      name,
      contact,
      email,
      user_id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Manager not found" });
    }
    const manQuery = "UPDATE managers SET salary = ? WHERE user_id = ?";
    const [result2] = await db.execute(manQuery, [salary, user_id]);

    if (result2.affectedRows === 0) {
      return res.status(404).send({ message: "Manager details not updated" });
    }
    return res.status(200).send({ message: "Manager Updated Successfully" });
  } catch (error) {
    console.error("Error updating manager", error);
    return res.status(500).send({ error: "Server error" });
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

export const updateService = async (req, res) => {
  try{
    const service_id = req.params.service_id;
  const { service_name, description, price, duration } = req.body;
  const query =
    "UPDATE services SET service_name = ?, description = ?, price = ?, duration = ? WHERE service_id = ?";
  const [results] = await db.execute(
    query,
    [service_name, description, price, duration, service_id])
      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Service not found" });
      }
      res.status(200).send({ message: "Updated Successfully" });
  }catch (error) {
    console.error("Error updating service", error);
    return res.status(500).send({ error: "Server error" });
  }
};

export const getServiceById =  async (req, res) => {
  const service_id = req.params.service_id;
  const query = "SELECT * FROM services WHERE service_id = ?";
  const [results] = await db.execute(query, [service_id]);
    if (results.length === 0) {
      return res.status(404).send("Service Not Found");
    }
    const service = results[0];
    console.log(service);
    return res.status(200).json({ service : service });
};

export const getTodayAppointments = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const query = "SELECT a.appointment_id, a.customer_id, a.start_time, a.end_time, a.payment_status, u.name, u.contact, b.branch_name FROM appointments a JOIN customers c ON a.customer_id = c.customer_id JOIN users u ON c.user_id = u.user_id JOIN branches b ON a.branch_id = b.branch_id WHERE a.date = CURDATE()";
  const [results] = await db.execute(query, [currentDate])
      if (results.length === 0) {
        return res.status(404).send("No Appointments Found");
      }
      const appointments = results;
      console.log(appointments);
      return res.status(200).json({ appointments : appointments });
    }
   catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const getAppointments = async (req, res) => {
  try {
    const [results] = await db.execute(`
      SELECT 
        a.date, 
        a.start_time, 
        a.end_time, 
        u.name, 
        u.contact, 
        b.branch_name, 
        a.payment_mode, 
        a.payment_status,
        a.appointment_id,
        a.app_status
      FROM appointments a 
      JOIN branches b ON a.branch_id = b.branch_id 
      JOIN customers c ON a.customer_id = c.customer_id 
      JOIN users u ON c.user_id = u.user_id 
      ORDER BY a.booked_date DESC, a.start_time DESC
    `);

    if (results.length === 0) {
      return res.status(404).send("No Appointments Found");
      }
      console.log("Results", results);
    return res.status(200).json({ appointments: results });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getAppointmentDetailsById = async (req, res) => {
    try {
        const appointment_id = req.params.appointment_id;
        const [result] = await db.execute(`
        SELECT
        cs.appointment_id,
        cs.employee_id,
        u.name,
        s.service_name,
        s.duration
        FROM appointments a
        JOIN client_service cs ON a.appointment_id = cs.appointment_id
        JOIN employees e ON e.employee_id = cs.employee_id
        JOIN users u ON e.user_id = u.user_id
        JOIN services s ON s.service_id = cs.service_id
        WHERE a.appointment_id = ?`, [appointment_id]);

        if (result.length === 0) {
            return res.status(404).send("Appointment Not Found");
        }
        return res.status(200).json({ appointmentDetails: result });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export const cancelAppointment = async (req, res) => {
  try{
    const appointment_id = req.params.appointment_id;
    const status = req.body.status;
    const query = "UPDATE appointments SET app_status = ? WHERE appointment_id = ?";
    await db.execute(query, [status, appointment_id]);
    return res.status(200).send("Appointment Updated Successfully");

  }catch(error){
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export const getRequests = async (req, res) => {
  try{
    const query = "SELECT l.leave_id, l.employee_id, l.date, l.reason, l.status, u.name FROM leaves l JOIN employees e ON l.employee_id = e.employee_id JOIN users u ON e.user_id = u.user_id";
    const [result] = await db.execute(query);
    if(result.length === 0){
      return res.status(404).send("No Requests Found");
    }
    const requests = result;
    console.log(requests);
    return res.status(200).json({ requests : requests });
  }catch(error){
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
  
}

export const updateRequest = async (req, res) => {
  try{
    const leave_id = req.params.leave_id;
    const status = req.body.status;
    const query = "UPDATE leaves SET status = ? WHERE leave_id = ?";
    await db.execute(query, [status, leave_id]);
    return res.status(200).send("Request Updated Successfully");

  }catch(error){
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export const getTodaySales = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const [result] = await db.execute("SELECT SUM(total) AS total_sales FROM sales WHERE sale_date = ?", [currentDate]);
        const totalSales = result[0].total_sales;
        if (totalSales === null) {
            return res.status(200).json({ totalSales: 0 });
        }
        return res.status(200).json({ totalSales: totalSales });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export const getTodayRevenueByServices = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const [result] = await db.execute("SELECT SUM(amount) AS total_amount from appointments WHERE date = ? AND app_status = 'Completed'", [currentDate]);
        const todayRevenue = result[0].total_amount;
        if (todayRevenue === null) {
            return res.status(200).json({ todayRevenue: 0 });
        }
        return res.status(200).json({ todayRevenue: todayRevenue });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

