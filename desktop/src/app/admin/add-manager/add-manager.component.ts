import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Branch } from '../../data_interface';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-manager',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css'
})
export class AddManagerComponent implements OnInit {
  managerForm !: FormGroup;
  branches : Branch[] = []

  constructor(
    private adminService : AdminService,
    private formBuild : FormBuilder,
    private router : Router
  ){}

  ngOnInit(): void {
    this.managerForm = this.formBuild.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.email],
        contact: ['', Validators.required],
        salary: ['', Validators.required]
      });  
  }

  onAddManager() {
    if (this.managerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.adminService.addManager(this.managerForm.value).subscribe({
      next: () => {
        alert('Manager added successfully!');
        this.router.navigate(['/managers']); 
      },
      error: (err) => {
        console.error('Error creating branch:', err);
        alert('Failed to create branch. Please try again.');
      }
    });
  }

}
