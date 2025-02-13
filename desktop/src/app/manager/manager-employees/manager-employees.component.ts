import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import  { ManagerService} from '../../services/manager.service';
import { CommonModule } from '@angular/common';
import  { Employee } from '../../data_interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manager-employees',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './manager-employees.component.html',
  styleUrl: './manager-employees.component.css'
})
export class ManagerEmployeesComponent implements OnInit {
  employees  : Employee[] = []
  userID !: number
  branchId !: number

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
          },
          (error) => console.error("Error fetching employees:", error)
        );
      },
      (error) => console.error("Error fetching branch ID:", error)
    );
  }  
}
