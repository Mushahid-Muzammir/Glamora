import { db } from "../server.js";
import { Appointments } from '../models/Appointment.model.js'

export const getAppointments = async (req, res) =>{
    const employee_id = req.params.employee_id;
    console.log("Employee Id : ",employee_id)
    const query = `SELECT  
                    a.appointment_id, 
                    a.customer_id, 
                    a.start_time, 
                    a.end_time, 
                    a.date, 
                    a.app_status, 
                    u.name, 
                    u.contact
                FROM 
                    employees e
                JOIN 
                    client_service cs ON cs.employee_id = e.employee_id
                JOIN 
                    appointments a ON a.appointment_id = cs.appointment_id
                JOIN 
                    customers c ON c.customer_id = a.customer_id
                JOIN 
                    users u ON u.user_id = c.user_id
                WHERE 
                    e.employee_id = ?;
`
    const [result] = await db.execute(query, [employee_id]);
    if (result.length === 0) {
        return res.status(404).send("Appointments Not Found");
      }
      console.log(result);
      return res.status(200).json({ appointments: result })
}

export const getTodayAppointments = async (req, res) =>{

  const currentDate = new Date().toISOString().split("T")[0];
  const employee_id = req.params.employee_id;
  console.log("Employee Id : ",employee_id)
  const query = `SELECT  
                  a.appointment_id, 
                  a.customer_id, 
                  a.start_time, 
                  a.end_time, 
                  a.date, 
                  a.app_status, 
                  u.name, 
                  u.contact
              FROM 
                  employees e
              JOIN 
                  client_service cs ON cs.employee_id = e.employee_id
              JOIN 
                  appointments a ON a.appointment_id = cs.appointment_id
              JOIN 
                  customers c ON c.customer_id = a.customer_id
              JOIN 
                  users u ON u.user_id = c.user_id
              WHERE 
                  e.employee_id = ? AND a.date = CURDATE() ;
`
  const [result] = await db.execute(query, [employee_id]);
  if (result.length === 0) {
      return res.status(404).send("Appointments Not Found");
    }
    console.log(result);
    return res.status(200).json({ appointments: result })
}

export const getEmployeeById = async (req, res) => {
  try{
    const user_id = req.params.user_id;
    const query = "SELECT u.user_id, e.employee_id FROM USERS u JOIN employees e ON u.user_id = e.user_id WHERE u.user_id = ?";
    const [result] = await db.execute(query, [user_id]);
    if (result.length === 0) {
      return res.status(404).send("Employee Not Found");
    }
    const employee = result[0];
    console.log(employee);
    return res.status(200).json({ employee : employee });
  }catch(error){
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export const updateStatus = async (req, res) => {
  const { appointment_id } = req.params;
  const { service_status } = req.body;
  console.log('Appointment ID:', appointment_id);
  console.log('Service Status:', service_status);

  try {
    
    const [result] = await db.execute(
      'UPDATE appointments SET service_status = ? WHERE appointment_id = ?',
      [service_status, appointment_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Service status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
}

export const  requestLeave = async (req, res) => {
  try{
    const employee_id = req.params.employeeId;
    const { date, reason } = req.body;
    console.log("Request Body",req.body);
    console.log("Employee Id at leave request: ",employee_id)
    const query = "INSERT INTO leaves(employee_id, date, reason, status) VALUES(?, ?, ?, ?)";
    const [result] = await db.execute(query, [employee_id, date, reason, "Pending"]);
    if (result.affectedRows === 0) {
        return res.status(404).send("Leave Request Failed");
      }
      console.log(result);
      return res.status(200).json({ message: "Leave Requested Successfully" })

  }catch(error){
    console.error("Database Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}