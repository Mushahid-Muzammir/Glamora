import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { SelectBranchComponent } from './pages/select-branch/select-branch.component';
import { SelectServiceComponent } from './pages/select-service/select-service.component';

export const routes: Routes = [
{ path: '', component: AppComponent },
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component :RegisterComponent},
{ path: 'branch', component :SelectBranchComponent},
{ path: 'service', component :SelectServiceComponent}
];
