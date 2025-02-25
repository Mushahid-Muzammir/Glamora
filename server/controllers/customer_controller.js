import { db } from "../server.js";
import nodemailer from 'nodemailer'

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

        const [result] = await db.execute("SELECT customer_id FROM customers WHERE user_id = ?", [user_id]);
        
        console.log("Database result:", result);
        
        const customer = result[0]; 
        if (!customer) {
            return res.status(404).send(`No User Found with user_id: ${user_id}`);
        }

        res.status(200).json({ customer: customer });
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
        "SELECT u.user_id, u.name, u.contact, u.email, e.employee_id, e.image_url, e.salary, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE b.branch_id = ?";
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

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mushahidmuzammir11339@gmail.com",
      pass: "cqyo axfx fpwj vezf"  
    },
    tls: {
      rejectUnauthorized: false  
    }
  });
  
  export const confirmBooking = async (req, res) => {
    try {
      const { branch_id, employee_id, date, start_time, end_time, customer_id } = req.body;
  
      const [appointmentResult] = await db.execute(
        `INSERT INTO appointments (branch_id, employee_id, date, start_time, end_time, customer_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [branch_id, employee_id, date, start_time, end_time, customer_id]
      );

      const branchQuery = `SELECT b.address FROM branches b WHERE b.branch_id = ?`;
      const [branchResult] = await db.execute(branchQuery, [branch_id]);
  
      if (branchResult.length === 0) {
        return res.status(500).json({ error: "Could not fetch branch" });
      }
  
      const branchAddress = branchResult[0].address;
  
      // Fetch customer email
      const emailQuery = `SELECT u.email FROM customers c JOIN users u ON u.user_id = c.user_id WHERE c.customer_id = ?`;
      const [emailResult] = await db.execute(emailQuery, [customer_id]);
  
      if (emailResult.length === 0) {
        return res.status(500).json({ error: "Could not fetch customer email" });
      }
  
      const userEmail = emailResult[0].email;
  
      const mailOptions = {
        from: "mushahidmuzammir11339@gmail.com",
        to: userEmail,
        subject: "Appointment Confirmation - Glamora Salon Booking",
        text: `Hello,
          
  Your appointment has been successfully booked.
          
  📅 Date: ${date}
  🕒 Time: ${start_time} - ${end_time}
  🏢 Branch Address: ${branchAddress}
          
  Thank you for choosing our salon!
          
  Best Regards,
  Salon Team`
      };
  
      // Send email and send response only ONCE
      transporter.sendMail(mailOptions)
        .then(() => {
          console.log("Email sent successfully");
          res.status(201).json({ message: "Booking confirmed and email sent!" });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Email sending failed, but booking is confirmed." });
        });
  
    } catch (error) {
      console.error("Error confirming booking:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const makeSales = async (req, res) => {
    try {
        const { items, total_amount, payment_type } = req.body;
  
        if (!items || items.length === 0) {
          return res.status(400).json({ error: "No items in the cart." });
        }
      
        const saleDate = new Date();
      
        const insertSalesQuery = `
          INSERT INTO sales (product_id, quantity, total_amount, payment_type, sale_date) 
          VALUES ?`;
      
        const saleValues = items.map(item => [
          item.id,
          1, 
          total_amount,
          payment_type,
          saleDate
        ]);
      
        db.query(insertSalesQuery, [saleValues], (err, result) => {
          if (err) {
            console.error("Error inserting sale:", err);
            return res.status(500).json({ error: "Error processing sale." });
          }
      
          res.json({ message: "Sale processed successfully!" });
        });
    }catch{

    }
}


