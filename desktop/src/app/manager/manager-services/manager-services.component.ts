import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../manager-sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import  { Service } from '../../data_interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manager-services',
  imports: [SidebarComponent, CommonModule, TopbarComponent, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './manager-services.component.html',
  styleUrl: './manager-services.component.css'
})
export class ManagerServicesComponent implements OnInit {
  services : Service[] = [];
  searchText: string = '';
  filteredServices : any[] =[];
  itemsPerPage : number = 5;
  currentPage : number = 1;

constructor(
  private managerService : ManagerService
){}

ngOnInit(): void {
  this.managerService.getServices().subscribe(
    (res : any) => {
      this.services = res.services;
      console.log(this.services);
      this.filteredServices = [...this.services]; 
    });
  }

  filterServices() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredServices = this.services.filter(
      (service) =>
        service.service_id.toString().includes(searchTextLower) ||
        service.service_name.toLowerCase().includes(searchTextLower)
    );
}
}
