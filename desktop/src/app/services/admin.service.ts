import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, Customer, Product, Service, Branch, Appointment } from '../data_interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = 'http://localhost:5000/admin';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.adminUrl}/getEmployees`);
  }

  editEmployee(user_id: number, employeeData: Employee){
    return this.http.put(`${this.adminUrl}/editEmployee/${user_id}`, employeeData);
  }

  getEmployeeServices(user_id: number) {
    return this.http.get(`${this.adminUrl}/getEmployeeServices/${user_id}`);
  }  

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.adminUrl}/getCustomers`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.adminUrl}/getProducts`);
  }

  addProduct(productData : FormData){
    return this.http.post(`${this.adminUrl}/addProduct`, productData);
  }

  getProductById(product_id: number){
    return this.http.get(`${this.adminUrl}/getProductById/${product_id}`);
  }
  
  getEmployeeById(user_id: number){
    return this.http.get(`${this.adminUrl}/getEmployeeById/${user_id}`);
  }

  editProduct(product_id: number, productData: Product){
    return this.http.put(`${this.adminUrl}/editProduct/${product_id}`, productData);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.adminUrl}/getServices`);
  }

  addService(serviceData : FormData){
    return this.http.post(`${this.adminUrl}/addService`, serviceData);
  }

  getServiceById(service_id: number){
    return this.http.get(`${this.adminUrl}/getServiceById/${service_id}`);
  }
  
  editService(service_id: number, serviceData: Service){
    return this.http.put(`${this.adminUrl}/editService/${service_id}`, serviceData);
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.adminUrl}/getBranches`);
  }

  getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.adminUrl}/getAppointments`)
  }
}
