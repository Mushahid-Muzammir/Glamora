import { db } from "../server.js";


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
