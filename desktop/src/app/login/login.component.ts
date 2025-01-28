import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  formBuild = inject(FormBuilder);
  router = inject(Router);
  LoginForm !: FormGroup;

  ngOnInit(): void {
    this.LoginForm = this.formBuild.group(
      {
        email: ['', Validators.email],
        password: ['', Validators.required]
      })
  }

  onLogin(){
    this.authService.loginService(this.LoginForm.value).subscribe(
      {
        next: (res) => {
          alert("Login Successful");
          this.authService.setLoggedIn(true);
          const userRole = res.user.role;
          console.log("User Role:", userRole);
          switch(userRole){
            case 'admin':
              this.router.navigate(['/adminHome']);
              break;
            case 'staff':
              this.router.navigate(['/staffHome']);
              break;
            case 'manager' :
              this.router.navigate(['/managerHome']);
              break;  
            default:
              this.router.navigate(['/login']);
          }         
          this.LoginForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

}
