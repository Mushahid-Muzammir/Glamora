import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formBuild = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  LoginForm!: FormGroup;
  user_id!: number;
  user!: any;
  errorMsg !: string

  ngOnInit(): void {
    this.LoginForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]] 
    });
  }

  onLogin(): void {
    if (this.LoginForm.invalid) {
      return; 
    }
    this.authService.loginService(this.LoginForm.value).subscribe({
      next: (res) => {
        this.user_id = res.user.user_id;
        this.authService.setUserId(this.user_id);
        alert("Login Successful");
        this.authService.setLoggedIn(true);
        this.user = res.user;
        this.router.navigate(['/home'], { queryParams: { user: this.user } });
        this.LoginForm.reset();
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = "Invalid email or password. Please try again."; 
      }
    });
  }
}
