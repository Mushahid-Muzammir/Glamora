import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { StaffHomeComponent } from './staff/staff-home/staff-home.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path : "adminHome", component: AdminHomeComponent },
    { path : "managerHome", component: ManagerHomeComponent },
    { path : "adminHome", component: StaffHomeComponent },
    
];
