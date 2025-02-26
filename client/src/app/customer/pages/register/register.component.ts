import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
})
export class RegisterComponent implements OnInit  {

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  onRegister() {
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert('User created successfully');
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creating user. Please try again.');
      },
    });
  }
}
