import { db } from "../server.js";

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

  export const getProductById = (req, res) => {
    const product_id = req.params.product_id;
    console.log(product_id);
    const query = "SELECT * FROM products WHERE product_id = ?";
    db.query(query, [product_id], (err, result) => {
      if(err){
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
          }
          if (result.length === 0) {
        return res.status(404).send("Product Not Found");
          }
          const product = result[0];
          console.log(product);
          return res.status(200).json({ product });
        });
  };
  

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

  export const getEmployeeById = (req, res) => {
    const user_id = req.params.user_id;
    const query = "SELECT u.user_id, u.name, u.email, u.contact, e.employee_id, e.salary, b.branch_id, b.branch_name FROM users u JOIN employees e ON u.user_id = e.user_id JOIN branches b ON e.branch_id = b.branch_id WHERE u.user_id = ?;";
    db.query(query, [user_id], (err, result) => {
      if(err){
        console.error("Database Error:", err);
        return res.status(500).send("Internal Server Error");
          }
          if (result.length === 0) {
        return res.status(404).send("Employee Not Found");
          }
          const employee = result[0];
          console.log(employee);
          return res.status(200).json({ employee });
        });
  };

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

  
