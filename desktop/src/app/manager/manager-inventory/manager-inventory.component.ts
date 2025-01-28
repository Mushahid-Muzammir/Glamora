import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-manager-inventory',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './manager-inventory.component.html',
  styleUrl: './manager-inventory.component.css'
})
export class ManagerInventoryComponent {

}
