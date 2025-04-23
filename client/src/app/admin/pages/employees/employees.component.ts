import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AdminService } from '../../../services/admin.service';
import { Employee } from '../../../data_interface';
import { Service } from '../../../data_interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-employees',
    imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css'
})
    export class EmployeesComponent implements OnInit {
      employees: Employee[] = [];
      searchText: string = '';
      filteredEmployees : any[] =[];
      currentPage: number = 1;   
      itemsPerPage: number = 5;
      services: Service[] = [];
      branches: any[] = [];
    employeeForm!: FormGroup; showForm: boolean = false; 
    selectedServices: number[] = [];


    constructor(
        private adminService: AdminService,
        private router: Router,
        private formBuilder: FormBuilder,
) { }

    ngOnInit(): void {
        this.adminService.getEmployees().subscribe(
          (res: any) => {
          this.employees = res.employees;
          console.log(this.employees);
          this.filteredEmployees = [...this.employees]; 
        },
        (error) => {
          console.error('Error fetching employees:', error);
           });

        this.employeeForm = this.formBuilder.group({
              name: ['', Validators.required],
              contact: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              branch: ['', Validators.required],
              salary: ['', Validators.required]
        });
    }

      filterEmployees() {
        const searchTextLower = this.searchText.toLowerCase();
        this.filteredEmployees = this.employees.filter(
          (employee) =>
            employee.employee_id.toString().includes(searchTextLower) ||
            employee.name.toLowerCase().includes(searchTextLower)
        );
      }

      editEmployee(employee: Employee){
        this.router.navigate(['editEmployee', employee.user_id]);
        }

      closePopup() {
        this.showForm = false;
      }

      openPopup() {
        this.showForm = true;
        this.adminService.getServices().subscribe(
            (res: any) => {
                this.services = res.services;
            },
            (error) => {
                console.error("Error fetching services:", error);
            });

        this.adminService.getBranches().subscribe(
            (res: any) => {
                this.branches = res.branches;
            },
            (error) => {
                console.error("Error fetching branches:", error);
            });
    }

    onServiceToggle(event: any) {
        const serviceId = +event.target.value;
        if (event.target.checked) {
            this.selectedServices.push(serviceId);
        } else {
            this.selectedServices = this.selectedServices.filter(id => id !== serviceId);
        }
    }

    onAddEmployee() {
        if (this.employeeForm.invalid) {
            return;
        }
        const employeeData = this.employeeForm.value;

        const payload = {
            ...employeeData,
            services: this.selectedServices
        };

        this.adminService.addEmployee(payload).subscribe({
            next: () => {
                alert('Employee created successfully!');
                this.employeeForm.reset();
                this.showForm = false;
                this.router.navigate(['/employees']);
                this.adminService.getEmployees().subscribe(
                    (res: any) => {
                        this.employees = res.employees;
                        this.filteredEmployees = [...this.employees];
                    });
            },
            error: (err) => {
                console.error('Error creating employee:', err);
                alert('Failed to create employee. Please try again.');
            }
        });
    }
}
