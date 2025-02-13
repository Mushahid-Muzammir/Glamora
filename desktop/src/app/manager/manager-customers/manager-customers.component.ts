import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import { Customer } from '../../data_interface';
import  { CommonModule } from '@angular/common'

@Component({
  selector: 'app-manager-customers',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './manager-customers.component.html',
  styleUrl: './manager-customers.component.css'
})
export class ManagerCustomersComponent implements OnInit {

  customers : Customer[] =[]
  constructor(
    private managerService : ManagerService
  ){}

  ngOnInit(): void {
    this.managerService.getCustomers().subscribe(
      (res : any) => {
        this.customers = res.customers;
        console.log(this.customers);
      });
  }

}
