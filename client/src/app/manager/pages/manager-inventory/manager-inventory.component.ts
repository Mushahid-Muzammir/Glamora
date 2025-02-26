import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/manager-sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ManagerService } from '../../../services/manager.service';
import { Product } from '../../../data_interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-manager-inventory',
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './manager-inventory.component.html',
  styleUrl: './manager-inventory.component.css'
})
export class ManagerInventoryComponent implements OnInit {
  products : Product[] = [];
  searchText: string = '';
  filteredProducts : any[] =[];
  itemsPerPage : number = 5;
  currentPage : number = 1;

  constructor(
    private managerService :  ManagerService
  ){}

  ngOnInit(): void {
    this.managerService.getProducts().subscribe(
      (res : any) => {
        this.products = res.products;
        console.log(this.products);
        this.filteredProducts = [...this.products]; 
      });   
  }
  filterProducts() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.product_id.toString().includes(searchTextLower) ||
        product.product_name.toLowerCase().includes(searchTextLower)
    );
}

}
