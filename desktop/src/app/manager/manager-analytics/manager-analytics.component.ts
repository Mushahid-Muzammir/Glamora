import { Component } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-analytics',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-analytics.component.html',
  styleUrl: './manager-analytics.component.css'
})
export class ManagerAnalyticsComponent {

}
