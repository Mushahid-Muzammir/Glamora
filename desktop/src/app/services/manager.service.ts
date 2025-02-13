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

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.managerUrl}/getServices`);
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
}
