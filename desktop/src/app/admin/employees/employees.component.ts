import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { AdminService } from '../../services/admin.service';
import { Employee } from '../../data_interface'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';
  filteredEmployees : any[] =[];

constructor(
  private adminService: AdminService,
  private router :Router
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
}
