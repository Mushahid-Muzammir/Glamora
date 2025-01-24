import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-inventory',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
