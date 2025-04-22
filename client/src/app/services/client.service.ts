import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Branch, Service, Product, Appointment, Employee} from '../data_interface'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = 'http://localhost:5000/client'
  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.clientUrl}/getBranches`);
  }

    getServicesByGender(gender: string): Observable<Service[]> {
        return this.http.get<Service[]>(`${this.clientUrl}/getServicesByGender/`, {
      params:{
        gender : gender
      }
    });
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

  getServiceDetails(serviceIds: string): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/getServiceDetails`, { 
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

  getEmployeeServices(employee_id: number) {
    return this.http.get(`${this.clientUrl}/getEmployeeServices/${employee_id}`);
  }

  getEmployeeById(employee_id : number){
    return this.http.get(`${this.clientUrl}/getEmployeeById/${employee_id}`);
  }

  getSpecialServices(){
    return this.http.get(`${this.clientUrl}/getSpecialServices`)
  }

  getSpecialServiceDetails(serviceIds: string): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/getSpecialServiceDetails`, { 
        params: { services: serviceIds }
    });
  }

  getServiceEmployees(serviceIds: string): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/getServiceEmployees`, { 
        params: { services: serviceIds }
    });
   }

   getEmployeeEachService(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/getEmployeeEachService`, {
        params: { service_id: serviceId }
    });
    }

    getBestSellingProducts(): Observable<Product> {
        return this.http.get<Product>(`${this.clientUrl}/getBestSellingProducts`);
    }

    getTestimonials(): Observable<any> {
        return this.http.get<any>(`${this.clientUrl}/getTestimonials`);
    }

    getMyBookings(customer_id: number): Observable<any> {
        return this.http.get(`${this.clientUrl}/getMyBookings/${customer_id}`);
    }
  
}


