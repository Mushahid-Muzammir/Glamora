import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from "../topbar/topbar.component";
import { AdminService } from '../../services/admin.service';
import { Product } from '../../data_interface';

@Component({
  selector: 'app-inventory',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  constructor(private adminService : AdminService) {}
  products : Product[] = [];
    ngOnInit(): void {
    this.adminService.getProducts().subscribe(
      (res: any) => {
        this.products = res.products;
        console.log(this.products);
      }
    )
    
  }

}
