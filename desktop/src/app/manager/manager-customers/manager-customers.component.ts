import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-customers',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-customers.component.html',
  styleUrl: './manager-customers.component.css'
})
export class ManagerCustomersComponent {

}
