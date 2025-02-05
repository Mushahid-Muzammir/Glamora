import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Branch, Service, Product} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = 'http://localhost:5000/client'
  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.clientUrl}/getBranches`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.clientUrl}/getServices`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.clientUrl}/getProducts`);
  }
}
