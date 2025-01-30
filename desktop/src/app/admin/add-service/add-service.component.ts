import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit {
  serviceForm!: FormGroup;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.formBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onAddService() {
    if (this.serviceForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.adminService.addService(this.serviceForm.value).subscribe({
      next: () => {
        alert('Service created successfully!');
        this.router.navigate(['/services']); 
      },
      error: (err) => {
        console.error('Error creating service:', err);
        alert('Failed to create service. Please try again.');
      }
    });
  }
}
