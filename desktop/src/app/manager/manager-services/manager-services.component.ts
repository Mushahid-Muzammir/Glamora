import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
@Component({
  selector: 'app-manager-services',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-services.component.html',
  styleUrl: './manager-services.component.css'
})
export class ManagerServicesComponent {

}
