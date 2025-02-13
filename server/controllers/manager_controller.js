import  { db } from "../server.js"

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