import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  user : any;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { this.user = this.authService.getUser(); }

  viewRequest() {
    this.router.navigate(['/viewRequest']);
  }
}
