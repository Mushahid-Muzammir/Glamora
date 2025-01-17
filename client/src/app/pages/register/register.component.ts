import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-register',
  imports: [
            RouterModule,
            MatButtonModule, 
            MatFormFieldModule, 
            MatCardModule,
            MatButtonModule,
            MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
