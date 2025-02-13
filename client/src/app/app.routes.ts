import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SelectBranchComponent } from './pages/select-branch/select-branch.component';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SelectDateComponent } from './pages/select-date/select-date.component';
import { ProductsComponent } from './pages/products/products.component';

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
];
