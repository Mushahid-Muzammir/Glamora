import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, Product, Service, Employee, Appointment } from '../data_interface';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private managerUrl = 'http://localhost:5000/manager';
  constructor(
    private http : HttpClient
  ) { }

  getCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${this.managerUrl}/getCustomers`);
    }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.managerUrl}/getProducts`);
  } 
  
  addProduct(productData : FormData){
    return this.http.post(`${this.managerUrl}/addProduct`, productData);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.managerUrl}/getServices`);
  }

  addService(serviceData : FormData){
    return this.http.post(`${this.managerUrl}/addService`, serviceData);
  }

  getBranchById(userId : number){
    return this.http.get(`${this.managerUrl}/getBranchById/${userId}`);
  }

  getEmployees(branchId : number): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.managerUrl}/getEmployees/${branchId}`);
  }

  getAppointments(branchId : number): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.managerUrl}/getAppointments/${branchId}`);
  }

  getTodayAppointments(branch_id : number): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.managerUrl}/getTodayAppointments/${branch_id}`);
  }

  addEmployee(employeeData : FormData){
    return this.http.post(`${this.managerUrl}/addEmployee`, employeeData);
  }

  getRequests(branchId : number){
    return this.http.get(`${this.managerUrl}/getRequests/${branchId}`);
  }

  updateLeaveStatus(leaveId: number, status: string) {
    return this.http.put(`${this.managerUrl}/updateStatus/${leaveId}`, { status });
  }
  
}
