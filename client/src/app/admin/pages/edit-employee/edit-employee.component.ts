import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Service } from '../../../data_interface'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  user_id!: number;
  employee_id!: number;
  services: Service[] = [];
  branches: any[] = [];
  assignedServices: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user_id = Number(this.route.snapshot.paramMap.get('user_id') || '');
    console.log("User ID:", this.user_id);

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      salary: ['', Validators.required],
      services: this.formBuilder.array([]) // Fix: Ensuring this is a FormArray
    });

    this.loadEmployeeData();
  }

  get servicesFormArray() {
    return this.employeeForm.get('services') as FormArray;
  }

  loadEmployeeData() {
    this.adminService.getEmployeeById(this.user_id).subscribe((res: any) => {
      this.employee_id = res.employee.employee_id;

      this.employeeForm.patchValue({
        name: res.employee.name,
        contact: res.employee.contact,
        email: res.employee.email,
        branch: res.employee.branch_id, // Fix: Ensure we're setting branch_id
        salary: res.employee.salary
      });

      this.adminService.getEmployeeServices(this.user_id).subscribe((servicesList: any) => {
        this.assignedServices = servicesList.services.map((s: any) => s.service_id);
        this.loadServices();
      });
    });

    this.adminService.getBranches().subscribe(
      (res: any) => {
        this.branches = res.branches;
      },
      (error) => {
        console.error("Error fetching branches:", error);
      }
    );
  }

  loadServices() {
    this.adminService.getServices().subscribe((res: any) => {
      this.services = res.services;
      this.initialServices(); // Fix: Ensure this is called AFTER we get services
    });
  }

  initialServices() {
    this.servicesFormArray.clear(); // Reset form array to avoid duplicates

    this.services.forEach(service => {
      const isAssigned = this.assignedServices.includes(service.service_id);
      this.servicesFormArray.push(this.formBuilder.control(isAssigned));
    });
  }

  confirmUpdate() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this employee?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.onUpdateEmployee(); 
          Swal.fire('Updated!', 'The employee has been updated.', 'success');
        }
      });
    }

  onUpdateEmployee() {
    const selectedServices = this.services
      .map((service, index) => (this.servicesFormArray.value[index] ? service.service_id : null))
      .filter(service_id => service_id !== null); // Get checked services

    const updatedEmployeeData = {
      ...this.employeeForm.value,
      services: selectedServices,
      employee_id: this.employee_id
    };

    this.adminService.editEmployee(this.user_id, updatedEmployeeData).subscribe(() => {
      console.log("Updated Employee:", updatedEmployeeData);
      this.router.navigate(['employees']);
    });
  }
}
