import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import  { Service } from '../../data_interface'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-services',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './manager-services.component.html',
  styleUrl: './manager-services.component.css'
})
export class ManagerServicesComponent implements OnInit {
  services : Service[] = []

constructor(
  private managerService : ManagerService
){}

ngOnInit(): void {
  this.managerService.getServices().subscribe(
    (res : any) => {
      this.services = res.services;
      console.log(this.services);
    }
  )
}
}
