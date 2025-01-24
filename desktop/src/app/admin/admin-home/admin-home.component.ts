import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-admin-home',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
