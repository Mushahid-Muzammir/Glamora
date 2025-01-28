import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-employees',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-employees.component.html',
  styleUrl: './manager-employees.component.css'
})
export class ManagerEmployeesComponent {

}
