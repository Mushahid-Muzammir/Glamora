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
  private authService: AuthService,
  private router: Router
) { 
  this.user = this.authService.getUser();
}

viewRequests(){
  this.router.navigate(['/requests']);
}

}
