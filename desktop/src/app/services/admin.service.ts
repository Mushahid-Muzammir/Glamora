import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, Customer, Product, Service } from '../data_interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUrl = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.adminUrl}/getEmployees`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.adminUrl}/getCustomers`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.adminUrl}/getProducts`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.adminUrl}/getServices`);
  }

  addService(serviceData : FormData){
    return this.http.post(`${this.adminUrl}/addService`, serviceData);
  }
  addProduct(productData : FormData){
    return this.http.post(`${this.adminUrl}/addProduct`, productData);
  }

  getBranches(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.adminUrl}/getBranches`);
  }
}
