import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Branch, Service, Product, Appointment, Employee} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = 'http://localhost:5000/client'
  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.clientUrl}/getBranches`);
  }

  getEmployees(branch_id : number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.clientUrl}/getEmployees/${branch_id}`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.clientUrl}/getServices`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.clientUrl}/getProducts`);
  }

  getCustomerById(user_id : number){
    return this.http.get(`${this.clientUrl}/getCustomerbyId/${user_id}`);
  }

  getBranchbyId( branch_id : number){
    return this.http.get<any>(`${this.clientUrl}/getBranchById/${branch_id}`);
  }

  getDuration(serviceIds: string): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/getDuration`, { 
        params: { services: serviceIds }
    });
}
  getAvailableSlots(branch_id: number, date: string, total_time:number){
    const params = new HttpParams()
    .set('branch_id', branch_id.toString())
    .set('date', date)
    .set('total_time', total_time.toString());

    return this.http.get<any>(`${this.clientUrl}/getAvailableSlots`, { params });
  }

  confirmBooking( bookingData: any) :Observable<any>{
    return this.http.post<any>(`${this.clientUrl}/confirmBooking`, bookingData);
  }

  processSale(saleData: any) {
    return this.http.post(`${this.clientUrl}/sales`, saleData);
  }
  
}
