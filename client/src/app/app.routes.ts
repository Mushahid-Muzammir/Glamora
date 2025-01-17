import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import path from 'path';

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component :RegisterComponent}
];
