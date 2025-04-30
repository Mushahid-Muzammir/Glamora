import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  user : any;
  dropdownOpen: boolean = false;

constructor(
  private authService: AuthService,
  private router: Router
) {  
    this.user  = this.authService.getUser();
  }

leaveRequest() { 
  this.router.navigate(['/leaveRequest']);
 }

 toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

logout() {
  this.authService.clearUser();
  this.router.navigate(['/staff']);
}

}
