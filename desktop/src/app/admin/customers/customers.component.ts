import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-customers',
  imports: [SidebarComponent, TopbarComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
