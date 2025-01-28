import { db } from "../server.js";

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
    const query = "SELECT * FROM users WHERE role = 'customer'";
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
      return res.status(200).json({ customers });
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
      return res.status(200).json({ products });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

export const getEmployees = (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE role = 'employee'";
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
      return res.status(200).json({ employees });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
  }
};

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
      return res.status(200).json({ services });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).send("An error occurred: " + error.message);
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
