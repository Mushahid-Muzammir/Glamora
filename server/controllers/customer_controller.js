import { db } from "../server.js";

export const getProducts = async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        if (products.length === 0) return res.status(404).send("No Products Found");
        res.status(200).json({ products });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getProductById = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const [result] = await db.query("SELECT * FROM products WHERE product_id = ?", [product_id]);
        if (result.length === 0) return res.status(404).send("Product Not Found");
        res.status(200).json({ product: result[0] });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getBranches = async (req, res) => {
    try {
        const [branches] = await db.query("SELECT * FROM branches");
        if (branches.length === 0) return res.status(404).send("No Branches Found");
        res.status(200).json({ branches });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const getCustomers = async (req, res) => {
    try {
        const [customers] = await db.query("SELECT * FROM users WHERE role = 'customer'");
        if (customers.length === 0) return res.status(404).send("No Users Found");
        res.status(200).json({ customers });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getCustomerbyId = async (req, res) => {
    try {
        const user_id = Number(req.params.user_id);  
        
        // Check if user_id is available
        if (!user_id) {
            return res.status(400).send("user_id is required");
        }

        // Run query to fetch customer data
        const result = await db.query("SELECT customer_id FROM customers WHERE user_id = ?", [user_id]);
        
        console.log("Database result:", result);
        
        const customer = result[0]; 
        if (!customer) {
            return res.status(404).send(`No User Found with user_id: ${user_id}`);
        }

        res.status(200).json({ customer });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getBranchById = async (req, res) => {
    try {
        const branch_id = Number(req.params.branch_id);  
        
        if (!branch_id) {
            return res.status(400).send("branch_id is required");
        }

        // Run query to fetch customer data
        const result = await db.query("SELECT * FROM branches WHERE branch_id = ?", [branch_id]);
        
        console.log("Database result:", result);
        
        const branch = result[0]; 
        if (!branch) {
            return res.status(404).send(`No User Found with user_id: ${user_id}`);
        }

        res.status(200).json({ branch });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const getEmployeesbyBranch = async (req, res) => {
    try {
        const branch_id = Number(req.params.branch_id);  
        const query =
        "SELECT u.user_id, u.name, u.contact, u.email, e.employee_id, e.salary, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE b.branch_id = ?";
      const [results] = await db.execute(query, [branch_id]);
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

export const getEmployeeById = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const [result] = await db.query(
            "SELECT u.user_id, u.name, u.email, u.contact, e.employee_id, e.salary, b.branch_id, b.branch_name " +
            "FROM users u JOIN employees e ON u.user_id = e.user_id " +
            "JOIN branches b ON e.branch_id = b.branch_id WHERE u.user_id = ?",
            [user_id]
        );
        if (result.length === 0) return res.status(404).send("Employee Not Found");
        res.status(200).json({ employee: result[0] });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getServices = async (req, res) => {
    try {
        const [services] = await db.query("SELECT * FROM services");
        if (services.length === 0) return res.status(404).send("No Services Found");
        res.status(200).json({ services });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getAvailableSlots = async (req, res) => {
    try {
        const { branch_id, date, total_time } = req.query;
        const [working_hours] = await db.query("SELECT DATE_FORMAT(open_time, '%H:%i') AS open_time, DATE_FORMAT(close_time, '%H:%i') AS close_time FROM branches WHERE branch_id = ?", [branch_id]);
        if (working_hours.length === 0) return res.status(404).json({ message: "Branch Not Found" });

        const { open_time, close_time } = working_hours[0];
        const [existing_app] = await db.query("SELECT DATE_FORMAT(start_time, '%H:%i') AS start_time, DATE_FORMAT(end_time, '%H:%i') AS end_time FROM appointments WHERE branch_id = ? AND date = ?", [branch_id, date]);
        const availableSlots = generateAvailableSlots(open_time, close_time, existing_app, total_time);
        res.json({ availableSlots });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getServiceDuration = async (req, res) => {
    try {
        const services = req.query.services;
        if (!services) return res.status(400).json({ message: "Services parameter is required" });

        const serviceIds = services.split(',').map(id => parseInt(id));
        if (serviceIds.some(isNaN) || serviceIds.length === 0) return res.status(400).json({ message: "Invalid service IDs provided" });

        const [rows] = await db.query("SELECT service_id, duration FROM services WHERE service_id IN (?)", [serviceIds]);
        res.status(200).json({ services: rows });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

function generateAvailableSlots(open_time, close_time, existing_app, total_time) {
    total_time = Number(total_time); // Ensure total_time is a number
    let slots = [];
    let current_time = open_time;
    console.log("Total time (minutes):", typeof(total_time)); // Log the total_time


    while (addMinutes(current_time, total_time) <= close_time) {
        let next_time = addMinutes(current_time, total_time);
        console.log("Next time:", next_time);

        // Check if this slot overlaps with any existing appointments
        if (!existing_app.some(app => isOverlapping(current_time, next_time, app.start_time, app.end_time))) {
            slots.push({ start_time: current_time, end_time: next_time });
        }

        // Move to the next potential slot based on the total duration of services
        current_time = next_time;
    }

    return slots;
}


function addMinutes(time, minutes) {
    let [h, m] = time.split(':').map(Number);
    let date = new Date(2000, 0, 1, h, m);
    date.setMinutes(date.getMinutes() + minutes);

    // Ensure the minutes and hours are formatted to "HH:mm"
    let hours = String(date.getHours()).padStart(2, '0');
    let minutesFormatted = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutesFormatted}`;
}


function isOverlapping(start1, end1, start2, end2) {
    return !(end1 <= start2 || start1 >= end2);
}

export const confirmBooking = async (req, res) => {
  try {
      const { branch_id, date, start_time, end_time, customer_id } = req.body;

      if (!branch_id || !date || !start_time || !end_time || !customer_id ) {
          return res.status(400).json({ message: "All fields are required." });
      }

      const [appointmentResult] = await db.query(
          `INSERT INTO appointments (branch_id, date, start_time, end_time, customer_id) VALUES (?, ?, ?, ?, ?)`,
          [branch_id, date, start_time, end_time, customer_id]
      );

      res.status(201).json({ message: "Booking confirmed successfully" });
  } catch (error) {
      console.error("Error confirming booking:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
