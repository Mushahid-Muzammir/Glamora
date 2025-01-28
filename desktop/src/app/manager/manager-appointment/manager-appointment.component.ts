import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-appointment',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-appointment.component.html',
  styleUrl: './manager-appointment.component.css'
})
export class ManagerAppointmentComponent {

}
