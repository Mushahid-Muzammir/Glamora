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

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component :RegisterComponent},
{ path: 'branch', component :SelectBranchComponent},
{ path: 'service/:branch_id', component :SelectServiceComponent},
{ path: 'about', component :AboutComponent},
{ path: 'contact', component :ContactComponent},
{ path: 'date', component :SelectDateComponent},
{ path: 'products', component :ProductsComponent},
{ path: "admin", component: AuthorityLoginComponent },
{ path : "adminHome", component: AdminHomeComponent },
{ path : "managerHome", component: ManagerHomeComponent },
{ path : "staffHome", component: StaffHomeComponent },
{ path : "customers", component: CustomersComponent },
{ path : "managers", component: ManagersComponent },
{ path : "editManager/:user_id", component: EditManagerComponent},
{ path : "managerCustomers", component: ManagerCustomersComponent },
{ path : "addManager", component : AddManagerComponent },
{ path : "appointment", component: AppointmentComponent },
{ path : "branches", component: AdminBranchComponent },
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
{ path : "editProduct/:product_id", component: EditProductComponent},
{ path : "services", component: ServicesComponent },
{ path : "addService", component: AddServiceComponent },  
{ path : "managerAddService", component: ManagerAddServiceComponent},                            
{ path : "editService/:service_id", component: EditServiceComponent},
{ path : "managerServices", component: ManagerServicesComponent },
{ path : "analytics", component: AnalyticsComponent },
{ path : "managerAnalytics", component: ManagerAnalyticsComponent }, 
{ path : "leaveRequest", component: LeaveRequestComponent },
{ path : "requests", component: RequestsComponent },
{ path : "viewRequest", component: ViewRequestComponent },
{ path : "verifyEmail", component: VerifyEmailComponent},
{ path : "occasions/:branch_id", component: SelectOccasionComponent}

];