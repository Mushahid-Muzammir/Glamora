import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, Customer, Product, Service, Branch, Appointment, Manager } from '../data_interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = 'http://localhost:5000/admin';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.adminUrl}/getEmployees`);
  }

  getEmployeeById(user_id: number){
    return this.http.get(`${this.adminUrl}/getEmployeeById/${user_id}`);
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

  getBranchById(branch_id: number){
    return this.http.get(`${this.adminUrl}/getBranchById/${branch_id}`);
  }

  addBranch(branchData : FormData){
    return this.http.post(`${this.adminUrl}/addBranch`, branchData);
  }

  editBranch(branch_id: number, branchData: Branch){
    return this.http.put(`${this.adminUrl}/editBranch/${branch_id}`, branchData);
  }

  getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.adminUrl}/getAppointments`);
  }

  getTodayAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.adminUrl}/getTodayAppointments`);
  }

  cancelAppointment(appointment_id: number, status : string){
    return this.http.put(`${this.adminUrl}/cancelAppointment/${appointment_id}`, { status });
    }

    getAppointmentDetailsById(appointment_id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.adminUrl}/getAppointmentDetailsById/${appointment_id}`);
    }

  getTodaySales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminUrl}/getTodaySales`);
    }

    getTodayRevenueByServices(): Observable<any> {
        return this.http.get<any>(`${this.adminUrl}/getTodayRevenueByServices`);
    }

  getManagers(): Observable<Manager[]>{
    return this.http.get<Manager[]>(`${this.adminUrl}/getManagers`);
  }

  getManagerById(user_id: number){
    return this.http.get(`${this.adminUrl}/getManagerById/${user_id}`);
  }

  addManager( managerData : FormData) {
    return this.http.post(`${this.adminUrl}/addManager`, managerData);
  }

  editManager(user_id: number, managerData: Manager){
    return this.http.put(`${this.adminUrl}/editManager/${user_id}`, managerData);
  }

  addEmployee(employeeData : FormData){
    return this.http.post(`${this.adminUrl}/addEmployee`, employeeData);
  }

  getRequests(){
    return this.http.get(`${this.adminUrl}/getRequests`);
  }

  updateLeaveStatus(leaveId: number, status: string) {
    return this.http.put(`${this.adminUrl}/updateStatus/${leaveId}`, { status });
  }

}
