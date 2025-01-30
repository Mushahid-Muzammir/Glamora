import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private authservice: AuthService) {}

  canActivate(): boolean {
    if(this.authservice.getLoggedIn())
    {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}






