import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/manager-sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-manager-analytics',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-analytics.component.html',
  styleUrl: './manager-analytics.component.css'
})
export class ManagerAnalyticsComponent {

}
