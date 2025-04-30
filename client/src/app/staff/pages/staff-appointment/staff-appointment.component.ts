import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { StaffService } from '../../../services/staff.service';
import { AuthService } from '../../../services/auth.service';
import { Appointment } from '../../../data_interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-appointment',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule],
  templateUrl: './staff-appointment.component.html',
  styleUrl: './staff-appointment.component.css'
})
export class StaffAppointmentComponent implements OnInit{
  searchText: string = '';
  filteredAppointments : any[] =[];
  userId !: number;
  employeeId !: number;
  appointments : Appointment[] = [];

  constructor(
    private staffService : StaffService,
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.staffService.getEmployeeById(this.userId).subscribe(
      (res: any) => {
        this.employeeId = res.employee.employee_id;
        console.log("Employee Id:", this.employeeId);
        this.staffService.getAppointments(this.employeeId).subscribe(
          (res : any) =>{
            this.appointments = res.appointments;
            console.log("Appointments : " ,this.appointments);
            this.filteredAppointments = [...this.appointments]; 

          });
      });
  }

  changeStatus(appointment: Appointment) {
    console.log('Appointment:', appointment);
    console.log('Appointment ID:', appointment.appointment_id);
    const newStatus = appointment.service_status === 'Pending' ? 'Done' : 'Pending';
    this.staffService.updateAppointmentStatus(appointment.appointment_id, newStatus).subscribe(
      (response: any) => {
        appointment.service_status = newStatus;
        console.log('Status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating status:', error);
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
