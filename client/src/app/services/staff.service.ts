import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffUrl = 'http://localhost:5000/staff';
  constructor(
    private http : HttpClient
  ) { }

  getAppointments(employee_id : number){
   return this.http.get(`${this.staffUrl}/getAppointments/${employee_id}`);
  }

  getTodayAppointments(employee_id : number){
    return this.http.get(`${this.staffUrl}/getTodayAppointments/${employee_id}`);
   }

  getEmployeeById(userId : number){
    return this.http.get(`${this.staffUrl}/getEmployeeById/${userId}`);
  }

  updateAppointmentStatus(appointment_id: number, service_status: string) {
    return this.http.put(`${this.staffUrl}/updateStatus/${appointment_id}`, { service_status });
  }

  requestLeave(employeeId : number, leaveData: FormData) {
    return this.http.post(`${this.staffUrl}/requestLeave/${employeeId}`, leaveData);
  }
}
