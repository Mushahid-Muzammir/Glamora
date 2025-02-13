import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../data_interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './manager-appointment.component.html',
  styleUrl: './manager-appointment.component.css'
})
export class ManagerAppointmentComponent implements OnInit {
  userId !: number
  branchId !: number
  appointments : Appointment[] = []

  constructor(
    private managerService : ManagerService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();  
    this.managerService.getBranchById(this.userId).subscribe(
      (res: any) => {
        this.branchId = res.manager.branch_id;
        console.log("Branch ID:", this.branchId);
        this.managerService.getAppointments(this.branchId).subscribe(
          (res: any) => {
            this.appointments = res.appointments;
            console.log("Appointments:", this.appointments);
          },
          (error) => console.error("Error fetching employees:", error)
        );
      },
      (error) => console.error("Error fetching branch ID:", error)
    );
  }
}
