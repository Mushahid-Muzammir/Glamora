import { Appointments } from './Appointment.model.js';
import { Employees } from './Employee.model.js';
import { Services } from './Service.model.js';
import { Customers } from './Customer.model.js';
import { Employee_Services } from './Employee_Service.model.js';
import { Branches } from './Branch.model.js';
import { Managers } from './Manager.model.js';
import { Users } from './User.model.js';
import { Products } from './Product.model.js';
import { Sales } from './Sale.model.js';

// Define the relationships between the tables

// Appointment relationships
Appointments.belongsTo(Customers, { foreignKey: 'customer_id' });
Appointments.belongsTo(Employees, { foreignKey: 'employee_id' });
Appointments.belongsTo(Services, { foreignKey: 'service_id' });
Appointments.belongsTo(Branches, { foreignKey: 'branch_id' });

// Employee relationships
Employees.belongsTo(Branches, { foreignKey: 'branch_id' });
Employees.belongsToMany(Services, { through: Employee_Services, foreignKey: 'employee_id' });

// Service relationships
Services.belongsToMany(Employees, { through: Employee_Services, foreignKey: 'service_id' });

// Customer relationships
Customers.hasMany(Appointments, { foreignKey: 'customer_id' });

// Branch relationships
Branches.hasMany(Employees, { foreignKey: 'branch_id' });
Branches.hasMany(Appointments, { foreignKey: 'branch_id' });

// Manager relationships
Managers.belongsTo(Users, { foreignKey: 'user_id' });
Customers.belongsTo(Users, { foreignKey: 'user_id' });
Employees.belongsTo(Users, { foreignKey: 'user_id' });
// User relationships

// Product relationships


// Sale relationships
