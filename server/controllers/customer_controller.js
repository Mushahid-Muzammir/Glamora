import { get } from "mongoose";
import { db } from "../server.js";
import nodemailer from 'nodemailer'

export const getProducts = async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM products");
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
        const [result] = await db.execute("SELECT * FROM products WHERE product_id = ?", [product_id]);
        if (result.length === 0) return res.status(404).send("Product Not Found");
        res.status(200).json({ product: result[0] });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getBranches = async (req, res) => {
    try {
        const [branches] = await db.execute("SELECT * FROM branches");
        if (branches.length === 0) return res.status(404).send("No Branches Found");
        res.status(200).json({ branches });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getCustomers = async (req, res) => {
    try {
        const [customers] = await db.execute("SELECT * FROM users WHERE role = 'customer'");
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
        const result = await db.execute("SELECT * FROM branches WHERE branch_id = ?", [branch_id]);       
        console.log("Database result:", result);       
        const branch = result[0]; 
        if (!branch) {
            return res.status(404).send(`No User Found with user_id: ${user_id}`);
        }
        res.status(200).json({ branch : branch });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const getEmployeesbyBranch = async (req, res) => {
    try {
        const branch_id = Number(req.query.branch_id); 
        const gender = req.query.gender; 
        const query =
        "SELECT u.user_id, u.name, u.contact, u.email, e.employee_id, e.image_url, e.title, e.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE b.branch_id = ? AND e.service_gender = ?";
      const [results] = await db.execute(query, [branch_id, gender]);
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
        const employee_id = parseInt(req.params.employee_id, 10);
        if (isNaN(employee_id)) {
            return res.status(400).send("Invalid Employee ID");
        }        const [result] = await db.execute(
            "SELECT u.name, u.contact, e.employee_id " +
            "FROM employees e JOIN users u ON u.user_id = e.user_id " +
            "WHERE e.employee_id = ?",
            [employee_id]
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
        const [services] = await db.execute("SELECT * FROM services");
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
        console.log("Query Params:", req.query);
        const [working_hours] = await db.execute("SELECT DATE_FORMAT(open_time, '%H:%i') AS open_time, DATE_FORMAT(close_time, '%H:%i') AS close_time FROM branches WHERE branch_id = ?", [branch_id]);
        if (working_hours.length === 0) return res.status(404).json({ message: "Branch Not Found" });

        const { open_time, close_time } = working_hours[0];
        const [existing_app] = await db.execute("SELECT DATE_FORMAT(start_time, '%H:%i') AS start_time, DATE_FORMAT(end_time, '%H:%i') AS end_time FROM appointments WHERE branch_id = ? AND date = ?", [branch_id, date]);
        const availableSlots = generateAvailableSlots(open_time, close_time, existing_app, total_time);
        console.log("Available Slots", availableSlots);
        res.json({ availableSlots });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getServiceDetails = async (req, res) => {
    try {
        const services = req.query.services;
        if (!services) return res.status(400).json({ message: "Services parameter is required" });

        const serviceIds = services.split(',').map(id => parseInt(id));
        if (serviceIds.some(isNaN) || serviceIds.length === 0) {
            return res.status(400).json({ message: "Invalid service IDs provided" });
        }

        const placeholders = serviceIds.map(() => '?').join(',');
        const [rows] = await db.execute(`SELECT service_id, service_name, price, duration FROM services WHERE service_id IN (${placeholders})`, serviceIds);
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
  
export const confirmBooking = async (req, res) => {
    try {
      const { branch_id , customer_id, employee_id, date, start_time, end_time } = req.body;
  
      const [appointmentResult] = await db.execute(
        `INSERT INTO appointments (branch_id, customer_id, employee_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)`,
        [branch_id, customer_id, employee_id, date, start_time, end_time]
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
  
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mushahidmuzammir11339@gmail.com",
      pass: "mqvm wspb xytk tovs"  
    },
    tls: {
      rejectUnauthorized: false  
    }
});

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

export const getEmployeeServices = async (req, res) => {
    try{
        const employee_id = req.params.employee_id;
        const [result] = await db.execute(
            "SELECT s.service_id, s.service_name, s.price, s.duration, s.description FROM services s JOIN employee_service es ON s.service_id = es.service_id WHERE es.employee_id = ?",
            [employee_id]
        );
        if (result.length === 0) return res.status(404).send("Employee Not Found");
        console.log("Employee Services:", result);
        const services = result;
        res.status(200).json({ services: services });

    }catch(error){
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const getSpecialServices = async (req, res) => {
    try {
        const [services] = await db.execute("SELECT * FROM special_services");
        if (services.length === 0) return res.status(404).send("No Services Found");
        res.status(200).json({ services });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
}





