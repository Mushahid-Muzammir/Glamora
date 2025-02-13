import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Appointment } from '../../data_interface';

@Component({
  selector: 'app-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  appointments : Appointment[] = []
  constructor(
    private adminService : AdminService
  ){}

  ngOnInit(): void {
    this.adminService.getAppointments().subscribe(
      (res : any) => {
        this.appointments = res.appointments;
      }
    )
  }

}
