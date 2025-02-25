import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { AdminService } from '../../services/admin.service';
import { Service } from '../../data_interface';

@Component({
  selector: 'app-services',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(
    private adminService : AdminService,
    private router : Router
  ){}
  services : Service[] = [];
  filteredServices : any[] =[];
  searchText: string = '';
  currentPage : number = 1;
  itemsPerPage : number = 5;

  ngOnInit() :void {
    this.adminService.getServices().subscribe(
      (res:any) => {
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

  editService(service: Service){
    this.router.navigate(['editService', service.service_id]);
  }

}
