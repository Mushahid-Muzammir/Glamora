import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-staff-home',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css'
})

export class StaffHomeComponent {

}
