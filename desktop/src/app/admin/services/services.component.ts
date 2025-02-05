import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { AdminService } from '../../services/admin.service';
import { Service } from '../../data_interface';

@Component({
  selector: 'app-services',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(
    private adminService : AdminService,
    private router : Router
  ){}
  services : Service[] = []
  
  ngOnInit() :void {
    this.adminService.getServices().subscribe(
      (res:any) => {
        this.services = res.services;
        console.log(this.services);
      });
  }

  editService(service: Service){
    this.router.navigate(['editService', service.service_id]);
  }

}
