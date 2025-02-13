import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ManagerService } from '../../services/manager.service';
import { Product } from '../../data_interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-inventory',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './manager-inventory.component.html',
  styleUrl: './manager-inventory.component.css'
})
export class ManagerInventoryComponent implements OnInit {
  products : Product[] = []
  constructor(
    private managerService :  ManagerService
  ){}

  ngOnInit(): void {
    this.managerService.getProducts().subscribe(
      (res : any) => {
        this.products = res.products;
        console.log(this.products);
      }
    )
    
  }

}
