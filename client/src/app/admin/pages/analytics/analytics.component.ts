import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";

@Component({
  selector: 'app-analytics',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

}
