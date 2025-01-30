import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Service } from '../../data_interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  services: Service[] = [];
  branches: any[] = [];
  employeeForm!: FormGroup;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.adminService.getServices().subscribe(
      (res: any) => {
        this.services = res.services;
        console.log(this.services);
      },
      (error) => {
        console.error("Error fetching services:", error);
      }
    );

    this.adminService.getBranches().subscribe(
      (res: any) => {
        this.branches = res.branches;
        console.log(this.branches);
      },
      (error) => {
        console.error("Error fetching branches:", error);
      }
    );

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branch: ['', Validators.required],
      service: ['', Validators.required]
    });
  }

  onAddEmployee() {
    if (this.employeeForm.valid) {
      // this.adminService.addEmployee(this.employeeForm.value).subscribe(
      //   (res) => {
      //     console.log("Employee added successfully:", res);
      //   },
      //   (error) => {
      //     console.error("Error adding employee:", error);
      //   }
      // );
    } else {
      // console.log("Form is invalid");
    }
  }
}
