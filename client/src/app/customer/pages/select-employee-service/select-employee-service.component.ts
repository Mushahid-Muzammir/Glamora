import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 

@Component({
    selector: 'app-select-employee-service',
    imports: [HeaderComponent, MatCheckboxModule],
  templateUrl: './select-employee-service.component.html',
  styleUrl: './select-employee-service.component.css'
})
export class SelectEmployeeServiceComponent {

}
