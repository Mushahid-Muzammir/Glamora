import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../data_interface'
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-customers',
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  filteredCustomers : any[] =[];
  searchText: string = '';
  currentPage: number = 1;   
  itemsPerPage: number = 5;


  constructor(private adminService: AdminService) { }
  customers: Customer[] = [];
  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(
      (res: any) => {
      this.customers = res.customers;
      console.log(this.customers);
      this.filteredCustomers = [...this.customers]; 
    });
  }

  filterCustomers() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.customer_id.toString().includes(searchTextLower) ||
        customer.name.toLowerCase().includes(searchTextLower)
    );
}
}
