import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
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

}
