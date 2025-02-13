import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { RouterModule } from '@angular/router';
import { Customer } from '../../data_interface'
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  constructor(private adminService: AdminService) { }

  customers: Customer[] = [];
  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(
      (res: any) => {
      this.customers = res.customers;
      console.log(this.customers);
    });
  }
}
