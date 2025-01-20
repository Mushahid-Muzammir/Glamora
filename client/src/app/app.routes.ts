import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SelectBranchComponent } from './pages/select-branch/select-branch.component';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component :RegisterComponent},
{ path: 'branch', component :SelectBranchComponent},
{ path: 'service', component :SelectServiceComponent},
{ path: 'about', component :AboutComponent},
{ path: 'contact', component :ContactComponent}

];
