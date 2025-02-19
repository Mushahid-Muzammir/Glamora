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
  private isLoggedin = false;
  private userId !: number;

  constructor(
    private http: HttpClient 
  ) {
  }
 
  private isSessionStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedin = value;
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem('loggedIn', JSON.stringify(value));
    }
  }

  getLoggedIn(): boolean {
    if (this.isSessionStorageAvailable()) {
      const status = sessionStorage.getItem('loggedIn');
      return status ? JSON.parse(status) : this.isLoggedin;
    }
    return this.isLoggedin;
  }
  
  registerService(regObject: RegisterData)
  {
    return this.http.post<any>(`${authUrl}/register`, regObject);
  }

  loginService(loginObject: LoginData)
  {
    return this.http.post<any>(`${authUrl}/login`, loginObject);
  }

  setUserId(userId: number): void {
    localStorage.setItem('user_id', userId.toString()); 
  }

  getUserId(): number {
    const userId = localStorage.getItem('user_id');
    return userId ? Number(userId) : 0;  
  }
  
  clearUserId(): void {
    this.userId = 0;
  }

}
