import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ServicesComponent } from './admin/services/services.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';

export const routes: Routes = [
    { path: "", component: AppointmentComponent },
    { path : "adminHome", component: AdminHomeComponent },
    { path : "managerHome", component: ManagerHomeComponent },
    { path : "staffHome", component: StaffHomeComponent },
    { path : "customers", component: CustomersComponent },
    { path : "appointment", component: AppointmentComponent },
    { path : "employees", component: EmployeesComponent },
    { path : "inventory", component: InventoryComponent },
    { path : "services", component: ServicesComponent },
    { path : "analytics", component: AnalyticsComponent }


    
];
