import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../data_interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manager-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule],
  templateUrl: './manager-appointment.component.html',
  styleUrl: './manager-appointment.component.css'
})
export class ManagerAppointmentComponent implements OnInit {
  userId !: number
  branchId !: number
  appointments : Appointment[] = [];
  searchText: string = '';
  filteredAppointments : any[] =[];


  constructor(
    private managerService : ManagerService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log("User Id:", this.userId);  
    this.managerService.getBranchById(this.userId).subscribe(
      (res: any) => {
        this.branchId = res.manager.branch_id;
        console.log("Branch ID:", this.branchId);
        this.managerService.getAppointments(this.branchId).subscribe(
          (res: any) => {
            this.appointments = res.appointments;
            console.log("Appointments:", this.appointments);
            this.filteredAppointments = [...this.appointments]; 

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
