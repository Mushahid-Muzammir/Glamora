import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Appointment } from '../../data_interface';

@Component({
  selector: 'app-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  searchText: string = '';
  filteredAppointments : any[] =[];
  appointments : Appointment[] = []
  constructor(
    private adminService : AdminService
  ){}

  ngOnInit(): void {
    this.adminService.getAppointments().subscribe(
      (res : any) => {
        this.appointments = res.appointments;
        this.filteredAppointments = [...this.appointments]; 
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
