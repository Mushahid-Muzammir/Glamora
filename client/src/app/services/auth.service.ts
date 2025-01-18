import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


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

  http = inject(HttpClient);

  registerService(regObject: RegisterData)
  {
    return this.http.post<any>(`${authUrl}/register`, regObject);
  }

  loginService(loginObject: LoginData)
  {
    return this.http.post<any>(`${authUrl}/login`, loginObject);
  }

}
