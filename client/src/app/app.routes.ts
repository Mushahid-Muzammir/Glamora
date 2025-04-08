import { Routes } from '@angular/router';
import { LoginComponent } from './customer/pages/login/login.component';
import { RegisterComponent } from './customer/pages/register/register.component';
import { HomeComponent } from './customer/pages/home/home.component';
import { SelectBranchComponent } from './customer/pages/select-branch/select-branch.component';
import { SelectServiceComponent } from './customer/pages/select-service/select-service.component';
import { AboutComponent } from './customer/pages/about/about.component';
import { ContactComponent } from './customer/pages/contact/contact.component';
import { SelectDateComponent } from './customer/pages/select-date/select-date.component';
import { ProductsComponent } from './customer/pages/products/products.component';
import { AuthGuard } from './services/auth.guard';
import { AuthorityLoginComponent } from './authority-login/authority-login.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { CustomersComponent } from './admin/pages/customers/customers.component';
import { ManagerCustomersComponent } from './manager/pages/manager-customers/manager-customers.component';
import { EmployeesComponent } from './admin/pages/employees/employees.component';
import { ManagerEmployeesComponent } from './manager/pages/manager-employees/manager-employees.component';
import { AddEmployeeComponent } from './admin/pages/add-employee/add-employee.component';
import { ManagerAddEmployeeComponent } from './manager/pages/manager-add-employee/manager-add-employee.component';
import { AppointmentComponent } from './admin/pages/appointment/appointment.component';
import { ManagerAppointmentComponent } from './manager/pages/manager-appointment/manager-appointment.component';
import { InventoryComponent } from './admin/pages/inventory/inventory.component';
import { ManagerInventoryComponent } from './manager/pages/manager-inventory/manager-inventory.component';
import { AddProductComponent } from './admin/pages/add-product/add-product.component';
import { ServicesComponent } from './admin/pages/services/services.component';
import { ManagerServicesComponent } from './manager/pages/manager-services/manager-services.component';
import { AddServiceComponent } from './admin/pages/add-service/add-service.component';
import { ManagerHomeComponent } from './manager/pages/manager-home/manager-home.component';
import { StaffHomeComponent } from './staff/pages/staff-home/staff-home.component';
import { AnalyticsComponent } from './admin/pages/analytics/analytics.component';
import { ManagerAnalyticsComponent } from './manager/pages/manager-analytics/manager-analytics.component';
import { EditServiceComponent } from './admin/pages/edit-service/edit-service.component';
import { EditProductComponent } from './admin/pages/edit-product/edit-product.component';
import { EditEmployeeComponent } from './admin/pages/edit-employee/edit-employee.component';
import { AdminBranchComponent } from './admin/pages/admin-branch/admin-branch.component';
import { StaffAppointmentComponent } from './staff/pages/staff-appointment/staff-appointment.component';
import { AddManagerComponent } from './admin/pages/add-manager/add-manager.component';
import { AddBranchComponent } from './admin/pages/add-branch/add-branch.component';
import { ManagersComponent } from './admin/pages/managers/managers.component';
import { EditBranchComponent } from './admin/pages/edit-branch/edit-branch.component';
import { EditManagerComponent } from './admin/pages/edit-manager/edit-manager.component';
import { ManagerAddServiceComponent } from './manager/pages/manager-add-service/manager-add-service.component';
import { ManagerAddProductComponent } from './manager/pages/manager-add-product/manager-add-product.component';
import { LeaveRequestComponent } from './staff/pages/leave-request/leave-request.component';
import { ViewRequestComponent } from './manager/pages/view-request/view-request.component';
import { RequestsComponent } from './admin/pages/requests/requests.component';
import { VerifyEmailComponent } from './customer/pages/verify-email/verify-email.component';
import { SelectOccasionComponent } from './customer/pages/select-occasion/select-occasion.component';
import { SelectEmployeeServiceComponent } from './customer/pages/select-employee-service/select-employee-service.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path : 'home', component: HomeComponent},
    { path : 'login', component: LoginComponent },
    { path : 'register', component :RegisterComponent},
    { path: 'branch', component: SelectBranchComponent, canActivate: [AuthGuard] },
    { path: 'service/:branch_id', component: SelectServiceComponent, canActivate: [AuthGuard] },
    { path : 'about', component :AboutComponent},
    { path : 'contact', component :ContactComponent},
    { path: 'date', component: SelectDateComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent },
    { path: "admin", component: AuthorityLoginComponent },
    { path : "staff", component: AuthorityLoginComponent },
    { path : "manager", component: AuthorityLoginComponent },
    { path: "adminHome", component: AdminHomeComponent, canActivate: [AuthGuard] },
    { path: "managerHome", component: ManagerHomeComponent, canActivate: [AuthGuard] },
    { path: "staffHome", component: StaffHomeComponent, canActivate: [AuthGuard] },
    { path: "customers", component: CustomersComponent, canActivate: [AuthGuard] },
    { path: "managers", component: ManagersComponent, canActivate: [AuthGuard] },
    { path: "editManager/:user_id", component: EditManagerComponent, canActivate: [AuthGuard] },
    { path: "managerCustomers", component: ManagerCustomersComponent, canActivate: [AuthGuard] },
    { path: "addManager", component: AddManagerComponent, canActivate: [AuthGuard] },
    { path: "appointment", component: AppointmentComponent, canActivate: [AuthGuard] },
    { path: "branches", component: AdminBranchComponent, canActivate: [AuthGuard] },
    { path: "addBranch", component: AddBranchComponent, canActivate: [AuthGuard] },
    { path: "editBranch/:branch_id", component: EditBranchComponent, canActivate: [AuthGuard] },
    { path: "managerAppointment", component: ManagerAppointmentComponent, canActivate: [AuthGuard] },
    { path: "staffAppointment", component: StaffAppointmentComponent, canActivate: [AuthGuard] },
    { path: "employees", component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: "addEmployee", component: AddEmployeeComponent, canActivate: [AuthGuard] },
    { path: "managerAddEmployeee", component: ManagerAddEmployeeComponent, canActivate: [AuthGuard] },
    { path: "editEmployee/:user_id", component: EditEmployeeComponent, canActivate: [AuthGuard] },
    { path: "managerEmployees", component: ManagerEmployeesComponent, canActivate: [AuthGuard] },
    { path: "inventory", component: InventoryComponent, canActivate: [AuthGuard] },
    { path: "managerInventory", component: ManagerInventoryComponent, canActivate: [AuthGuard] },
    { path: "addProduct", component: AddProductComponent, canActivate: [AuthGuard] },
    { path: "managerAddProduct", component: ManagerAddProductComponent, canActivate: [AuthGuard] },
    { path: "editProduct/:product_id", component: EditProductComponent, canActivate: [AuthGuard] },
    { path: "services", component: ServicesComponent, canActivate: [AuthGuard] },
    { path: "addService", component: AddServiceComponent, canActivate: [AuthGuard] },  
    { path: "managerAddService", component: ManagerAddServiceComponent, canActivate: [AuthGuard] },                            
    { path: "editService/:service_id", component: EditServiceComponent, canActivate: [AuthGuard] },
    { path: "managerServices", component: ManagerServicesComponent, canActivate: [AuthGuard] },
    { path: "analytics", component: AnalyticsComponent, canActivate: [AuthGuard] },
    { path: "managerAnalytics", component: ManagerAnalyticsComponent, canActivate: [AuthGuard] }, 
    { path: "leaveRequest", component: LeaveRequestComponent, canActivate: [AuthGuard] },
    { path: "requests", component: RequestsComponent, canActivate: [AuthGuard] },
    { path: "viewRequest", component: ViewRequestComponent, canActivate: [AuthGuard] },
    { path: "verifyEmail", component: VerifyEmailComponent, canActivate: [AuthGuard] },
    { path: "occasions/:branch_id", component: SelectOccasionComponent, canActivate: [AuthGuard] },
    { path: "employeeService", component: SelectEmployeeServiceComponent, canActivate: [AuthGuard] }

];