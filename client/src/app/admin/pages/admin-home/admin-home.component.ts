import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Appointment, Employee } from '../../../data_interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-home',
  imports: [SidebarComponent, TopbarComponent, FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  appointments : Appointment[] = [];
  searchText: string = '';
  filteredAppointments : any[] =[];
  employees : Employee[] = [];
  itemsPerPage : number = 5;
  currentPage : number = 1;


  constructor(
    private adminService : AdminService
  ){}

  ngOnInit(): void {
    this.adminService.getTodayAppointments().subscribe(
      (res:any) => {
        this.appointments = res.appointments;
        this.filteredAppointments = [...this.appointments]; 
        console.log(this.appointments);
      });
      this.adminService.getEmployees().subscribe(
        (res : any) => {
          this.employees = res.employees;
        });
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
