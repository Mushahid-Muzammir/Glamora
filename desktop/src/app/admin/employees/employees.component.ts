import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { AdminService } from '../../services/admin.service';
import { Employee } from '../../data_interface'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getEmployees().subscribe(
      (res: any) => {
      this.employees = res.employees;
      console.log(this.employees);
    },
    (error) => {
      console.error('Error fetching employees:', error);
    });
  }
}
