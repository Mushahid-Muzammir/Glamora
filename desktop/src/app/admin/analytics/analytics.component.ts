import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-analytics',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

}
