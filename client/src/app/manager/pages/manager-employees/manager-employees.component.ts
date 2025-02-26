import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/manager-sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ManagerService} from '../../../services/manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../data_interface';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-manager-employees',
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './manager-employees.component.html',
  styleUrl: './manager-employees.component.css'
})
export class ManagerEmployeesComponent implements OnInit {
  employees  : Employee[] = [];
  userID !: number;
  branchId !: number;
  searchText: string = '';
  filteredEmployees : any[] =[];
  itemsPerPage : number = 5;
  currentPage : number = 1;

  constructor( 
    private managerService : ManagerService,
    private authService : AuthService
  ){}
  ngOnInit(): void {
    this.userID = this.authService.getUserId();
    
    this.managerService.getBranchById(this.userID).subscribe(
      (res: any) => {
        this.branchId = res.manager.branch_id;
        console.log("Branch ID:", this.branchId);
  
        this.managerService.getEmployees(this.branchId).subscribe(
          (res: any) => {
            this.employees = res.employees;
            console.log("Employees:", this.employees);
            this.filteredEmployees = [...this.employees]; 

          },
          (error) => console.error("Error fetching employees:", error)
        );
      },
      (error) => console.error("Error fetching branch ID:", error)
    );
  } 
  filterEmployees() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.employee_id.toString().includes(searchTextLower) ||
        employee.name.toLowerCase().includes(searchTextLower)
    );
  }  
}
