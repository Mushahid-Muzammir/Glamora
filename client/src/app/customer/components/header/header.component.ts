import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user !: any;

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  startService(){
    if(this.authService.getLoggedIn()){
      this.router.navigate(['/branch']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  LogOut(){
    this.authService.setLoggedIn(false);
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }

}
