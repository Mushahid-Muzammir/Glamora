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
    user: any;
    dropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  )
  { this.user = this.authService.getUser(); }

  viewRequest() {
    this.router.navigate(['/viewRequest']);
    }
    logout() {
        this.authService.clearUser();
        this.router.navigate(['/manager']);
    }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }
}
