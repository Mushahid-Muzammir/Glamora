import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { Employee, Appointment } from '../../data_interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-manager-home',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css'
})
export class ManagerHomeComponent implements OnInit {
  userID !: number;
  branchId !: number;
  currentPage : number = 1;
  appointments : Appointment[] = [];
  employees : Employee[] = [];
  filteredEmployees : any[] =[];
  filteredAppointments : any[] =[];
  searchText: string = '';
  itemsPerPage : number = 3;


  constructor(
    private managerService: ManagerService,
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
            this.filteredEmployees = [...this.employees];
            
            this.managerService.getTodayAppointments(this.branchId).subscribe(
              (res : any) => {
                this.appointments = res.appointments;
                this.filteredAppointments = [ ...this.appointments];
              });
          },
          (error) => console.error("Error fetching employees:", error)
        );
      },
      (error) => console.error("Error fetching branch ID:", error)
    );    
  } 

  filterAppointments() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredAppointments = this.appointments.filter(
      (appointment) =>
        appointment.appointment_id.toString().includes(searchTextLower) ||
        appointment.name.toLowerCase().includes(searchTextLower)
    );
  }

}
