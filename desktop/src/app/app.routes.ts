import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { ManagerCustomersComponent } from './manager/manager-customers/manager-customers.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { ManagerEmployeesComponent } from './manager/manager-employees/manager-employees.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ManagerAddEmployeeComponent } from './manager/manager-add-employee/manager-add-employee.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { ManagerAppointmentComponent } from './manager/manager-appointment/manager-appointment.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { ManagerInventoryComponent } from './manager/manager-inventory/manager-inventory.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ServicesComponent } from './admin/services/services.component';
import { ManagerServicesComponent } from './manager/manager-services/manager-services.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { ManagerAnalyticsComponent } from './manager/manager-analytics/manager-analytics.component';
import { LoginComponent } from './login/login.component';
import { EditServiceComponent } from './admin/edit-service/edit-service.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { EditEmployeeComponent } from './admin/edit-employee/edit-employee.component';
import { AdminBranchComponent } from './admin/admin-branch/admin-branch.component';
import { StaffAppointmentComponent } from './staff/staff-appointment/staff-appointment.component';
import { AddManagerComponent } from './admin/add-manager/add-manager.component';
import { AddBranchComponent } from './admin/add-branch/add-branch.component';
import { ManagersComponent } from './admin/managers/managers.component';
import { EditBranchComponent } from './admin/edit-branch/edit-branch.component';
import { EditManagerComponent } from './admin/edit-manager/edit-manager.component';
import { ManagerAddServiceComponent } from './manager/manager-add-service/manager-add-service.component';
import { ManagerAddProductComponent } from './manager/manager-add-product/manager-add-product.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path : "adminHome", component: AdminHomeComponent },
    { path : "managerHome", component: ManagerHomeComponent },
    { path : "staffHome", component: StaffHomeComponent },
    { path : "customers", component: CustomersComponent },
    { path : "managers", component: ManagersComponent },
    { path : "editManager/:user_id", component: EditManagerComponent},
    { path : "managerCustomers", component: ManagerCustomersComponent },
    { path : "addManager", component : AddManagerComponent },
    { path : "appointment", component: AppointmentComponent },
    { path : "branch", component: AdminBranchComponent },
    { path : "addBranch", component : AddBranchComponent},
    { path : "editBranch/:branch_id", component : EditBranchComponent},
    { path : "managerAppointment", component: ManagerAppointmentComponent },
    { path : "staffAppointment", component: StaffAppointmentComponent},
    { path : "employees", component: EmployeesComponent },
    { path : "addEmployee", component: AddEmployeeComponent },
    { path : "managerAddEmployeee", component: ManagerAddEmployeeComponent},
    { path : "editEmployee/:user_id", component: EditEmployeeComponent },
    { path : "managerEmployees", component: ManagerEmployeesComponent },
    { path : "inventory", component: InventoryComponent },
    { path : "managerInventory", component: ManagerInventoryComponent },
    { path : "addProduct", component: AddProductComponent },
    { path : "managerAddProduct", component: ManagerAddProductComponent},
    { path:  "editProduct/:product_id", component: EditProductComponent},
    { path : "services", component: ServicesComponent },
    { path : "addService", component: AddServiceComponent },  
    { path : "managerAddService", component: ManagerAddServiceComponent},                            
    { path : "editService/:service_id", component: EditServiceComponent},
    { path : "managerServices", component: ManagerServicesComponent },
    { path : "analytics", component: AnalyticsComponent },
    { path : "managerAnalytics", component: ManagerAnalyticsComponent },   
];
