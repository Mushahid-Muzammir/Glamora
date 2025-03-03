import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Allows only a 10-digit number
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert('User created successfully. Check your email for verification.');
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Error creating user. Please try again.');
      },
    });
  }
}
