import { Component } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-home',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css'
})
export class ManagerHomeComponent {

}
