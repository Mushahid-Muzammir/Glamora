import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId !: number

  constructor(private http : HttpClient) { }

  private isLoggedin = false;

  setLoggedIn(value: boolean){
    this.isLoggedin = value;
    localStorage.setItem('loggedIn', JSON.stringify(value));
  }

  getLoggedIn(): boolean{
    const status = sessionStorage.getItem('loggedIn');
    return status ? JSON.parse(status) : this.isLoggedin;
  }
  
  loginService(loginObject: any){
    return this.http.post<any>('http://localhost:5000/auth/login', loginObject);
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
