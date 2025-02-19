import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-add-service',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manager-add-service.component.html',
  styleUrl: './manager-add-service.component.css'
})
export class ManagerAddServiceComponent implements OnInit {
  serviceForm!: FormGroup;

  constructor(
    private router: Router,
    private managerService: ManagerService,
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

    this.managerService.addService(this.serviceForm.value).subscribe({
      next: () => {
        alert('Service created successfully!');
        this.router.navigate(['/managerServices']); 
      },
      error: (err) => {
        console.error('Error creating service:', err);
        alert('Failed to create service. Please try again.');
      }
    });
  }
}
