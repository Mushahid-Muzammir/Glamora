import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId !: number
  user: any;

  constructor(private http : HttpClient) { }

  private isLoggedin = false;

  setLoggedIn(value: boolean){
    this.isLoggedin = value;
  }

  getLoggedIn(): boolean{
    return  this.isLoggedin;
  }
  
  loginService(loginObject: any){
    return this.http.post<any>('http://localhost:5000/auth/login', loginObject);
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
