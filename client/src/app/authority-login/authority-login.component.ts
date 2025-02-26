import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authority-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './authority-login.component.html',
  styleUrl: './authority-login.component.css'
})
export class AuthorityLoginComponent implements OnInit {

  LoginForm!: FormGroup;
  user_id!: number;
  isLoading: boolean = false;
  loginError: string = '';
  user : any;

  constructor(
    private authService : AuthService,
    private formBuild : FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.LoginForm = this.formBuild.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]]
    });
  }

  onLogin() {
    if (this.LoginForm.invalid) {
      this.loginError = 'Please fill in valid credentials';
      return;
    }

    this.isLoading = true;
    this.authService.loginService(this.LoginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.authService.setLoggedIn(true);
        this.user_id = res.user.user_id;
        this.authService.setUserId(this.user_id);

        console.log("user ID:", this.user_id);
        const userRole = res.user.role;
         this.user = res.user;
         this.authService.setUser(this.user);

        // Navigate based on user role
        switch (userRole) {
          case 'admin':
            this.router.navigate(['/adminHome'], { queryParams: { user: this.user } });
            break;
          case 'staff':
            this.router.navigate(['/staffHome']);
            break;
          case 'manager':
            this.router.navigate(['/managerHome']);
            break;
          default:
            this.router.navigate(['/login']);
        }

        this.LoginForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'Invalid email or password. Please try again.';
        console.error(err);
      }
    });
  }
}


