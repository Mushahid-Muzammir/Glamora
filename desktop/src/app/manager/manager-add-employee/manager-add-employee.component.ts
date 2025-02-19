import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { Service } from '../../data_interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-add-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-add-employee.component.html',
  styleUrl: './manager-add-employee.component.css'
})
export class ManagerAddEmployeeComponent implements OnInit{
  userId !: number;
  branchId !: number
  services: Service[] = [];
  employeeForm!: FormGroup;

  constructor(
    private managerService: ManagerService, 
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    
    // Fetch branch ID
    this.managerService.getBranchById(this.userId).subscribe(
      (res: any) => {
        this.branchId = res.manager.branch_id;
        console.log("Branch ID:", this.branchId);
        
        this.employeeForm.patchValue({
          branch: this.branchId
        });
      },
      (error) => console.error("Error fetching branch ID:", error)
    );
  
    // Fetch services
    this.managerService.getServices().subscribe(
      (res: any) => {
        this.services = res.services;
        console.log(this.services);
      },
      (error) => {
        console.error("Error fetching services:", error);
      }
    );
  
    // Initialize form
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branch: [null], 
      salary: ['', Validators.required]
    });
  }
  
  onAddEmployee() {
    if (this.employeeForm.valid) {
       this.managerService.addEmployee(this.employeeForm.value).subscribe(
         (res) => {
           console.log("Employee added successfully:", res);
           this.router.navigate(['/managerEmployees'])
        },
         (error) => {
           console.error("Error adding employee:", error);
         });
    } else {
       console.log("Form is invalid");
    }
  }
}
