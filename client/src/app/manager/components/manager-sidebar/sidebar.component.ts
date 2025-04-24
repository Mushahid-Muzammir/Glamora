import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    logout() {
        this.authService.clearUser();
        this.router.navigate(['/manager']);
    }

}
