import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);
  router = inject(Router);

  startService(){
    if(this.authService.getLoggedIn()){
      this.router.navigate(['/branch']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
