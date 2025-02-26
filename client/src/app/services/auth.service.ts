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
  user !: any;
  

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
    this.userId = userId;
    sessionStorage.setItem('userId', String(userId));
  }

  getUserId(): number {
    this.userId = Number(sessionStorage.getItem('userId'));
    return this.userId ? Number(this.userId) : 0;  
  }
  
  clearUserId(): void {
    sessionStorage.removeItem('userId');
    this.userId = 0;
  }
  
  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): any {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.user;
  }

  clearUser(): void {
    sessionStorage.removeItem('user');
    this.user = null;
  }

}
