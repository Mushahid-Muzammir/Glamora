import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const authUrl = "http://localhost:5000/auth"

export interface RegisterData {
  name: string;
  contact: number;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  private isLoggedin = false;

  setLoggedIn(value: boolean){
    this.isLoggedin = value;
    sessionStorage.setItem('loggedIn', JSON.stringify(value));
  }

  getLoggedIn(): boolean{
    const status = sessionStorage.getItem('loggedIn');
    return status ? JSON.parse(status) : this.isLoggedin;
  }

  registerService(regObject: RegisterData)
  {
    return this.http.post<any>(`${authUrl}/register`, regObject);
  }

  loginService(loginObject: LoginData)
  {
    return this.http.post<any>(`${authUrl}/login`, loginObject);
  }

}
