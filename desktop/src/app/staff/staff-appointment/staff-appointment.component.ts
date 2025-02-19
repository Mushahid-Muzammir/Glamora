import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../data_interface';

@Component({
  selector: 'app-staff-appointment',
  imports: [],
  templateUrl: './staff-appointment.component.html',
  styleUrl: './staff-appointment.component.css'
})
export class StaffAppointmentComponent implements OnInit{
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
          });
      });

  }

}
