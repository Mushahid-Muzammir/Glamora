import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Appointment } from '../../../data_interface';
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
  selectedDate !: Date;
  showPopup: boolean = false;
  selectedAppointment: any = null;
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

    formatDateOnly(date: any): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    }

    filterAppointments() {
        const searchTextLower = this.searchText.toLowerCase();
        const selectedDateString = this.selectedDate
            ? this.formatDateOnly(this.selectedDate)
            : null;

        this.filteredAppointments = this.appointments.filter((appointment) => {
            const matchSearch =
                appointment.appointment_id.toString().includes(searchTextLower) ||
                appointment.name.toLowerCase().includes(searchTextLower);

            const appointmentDateString = this.formatDateOnly(appointment.date);

            const matchDate = selectedDateString
                ? appointmentDateString === selectedDateString
                : true;

            return matchSearch && matchDate;
        });
    }

   confirmCancel(appointment_id : number , status : string){
       Swal.fire({
           title: 'Are you sure you want to cancel this appointment?',
           showDenyButton: true,
           confirmButtonText: `Yes`,
           denyButtonText: `No`,
       }).then((result) => {
           if (result.isConfirmed) {
               this.cancelAppointment(appointment_id, status);
               Swal.fire('Appointment cancelled!', '', 'success')
           } else if (result.isDenied) {
               Swal.fire('Appointment not cancelled', '', 'info')
           }
       });
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

    viewAppointment(appointment: Appointment) {
        this.selectedAppointment = appointment;
        this.showPopup = true;
    }

    closePopup() {
        this.showPopup = false;
    }

}
