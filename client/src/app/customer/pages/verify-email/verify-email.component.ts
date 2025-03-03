import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  message : string = "Verifying your email...."
  isSuccess : boolean = false;
  
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private authService : AuthService,
  ){}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token){
      this.authService.verifyEmailService(token).subscribe(
        (res : any) => {
          this.message = res.message;
          this.isSuccess = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
        (err : any) => {
          this.message = err.error.message;
          this.isSuccess = false;
        });
    } else {
      this.message = 'No token provided';
      this.isSuccess = false;
    }
  }

}
