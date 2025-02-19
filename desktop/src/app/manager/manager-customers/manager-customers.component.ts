import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import { Customer } from '../../data_interface';
import  { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manager-customers',
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule],
  templateUrl: './manager-customers.component.html',
  styleUrl: './manager-customers.component.css'
})
export class ManagerCustomersComponent implements OnInit {
  searchText: string = '';
  filteredCustomers : any[] =[];
  customers : Customer[] =[]
  constructor(
    private managerService : ManagerService
  ){}

  ngOnInit(): void {
    this.managerService.getCustomers().subscribe(
      (res : any) => {
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
