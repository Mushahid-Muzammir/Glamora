import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
            RouterOutlet,
            MatButtonModule, 
            MatFormFieldModule, 
            MatCardModule,
            MatButtonModule,
            MatInputModule,
            
          ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
