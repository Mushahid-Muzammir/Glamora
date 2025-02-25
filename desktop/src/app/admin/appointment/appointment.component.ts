import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Appointment } from '../../data_interface';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  searchText: string = '';
  filteredAppointments : any[] =[];
  appointments : Appointment[] = [];
  currentPage: number = 1;   
  itemsPerPage: number = 5;


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

confirmCancel(appointment_id : number , status : string){
  Swal.fire({
    title: 'Are you sure you want to cancel this appointment?',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.cancelAppointment(appointment_id , status);
      Swal.fire('Appointment cancelled!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Appointment not cancelled', '', 'info')
    }
  })
}

cancelAppointment(appointment_id: number, status : string) {
  status = "cancelled"; 
  this.adminService.cancelAppointment(appointment_id, status).subscribe(
    (res: any) => {
      this.appointments = this.appointments.filter(
        (appointment) => appointment.appointment_id !== appointment_id
      );
      this.filteredAppointments = this.filteredAppointments.filter(
        (appointment) => appointment.appointment_id !== appointment_id
      );
    });
  }
}
