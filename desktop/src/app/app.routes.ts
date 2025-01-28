import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { ManagerCustomersComponent } from './manager/manager-customers/manager-customers.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { ManagerEmployeesComponent } from './manager/manager-employees/manager-employees.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { ManagerAppointmentComponent } from './manager/manager-appointment/manager-appointment.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ManagerInventoryComponent } from './manager/manager-inventory/manager-inventory.component';
import { ServicesComponent } from './admin/services/services.component';
import { ManagerServicesComponent } from './manager/manager-services/manager-services.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { ManagerAnalyticsComponent } from './manager/manager-analytics/manager-analytics.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path : "adminHome", component: AdminHomeComponent },
    { path : "managerHome", component: ManagerHomeComponent },
    { path : "staffHome", component: StaffHomeComponent },
    { path : "customers", component: CustomersComponent },
    { path : "managerCustomers", component: ManagerCustomersComponent },
    { path : "appointment", component: AppointmentComponent },
    { path : "managerAppointment", component: ManagerAppointmentComponent },
    { path : "employees", component: EmployeesComponent },
    { path : "managerEmployees", component: ManagerEmployeesComponent },
    { path : "inventory", component: InventoryComponent },
    { path : "managerInventory", component: ManagerInventoryComponent },
    { path : "services", component: ServicesComponent },
    { path : "managerServices", component: ManagerServicesComponent },
    { path : "analytics", component: AnalyticsComponent },
    { path : "managerAnalytics", component: ManagerAnalyticsComponent },                                


    
];
