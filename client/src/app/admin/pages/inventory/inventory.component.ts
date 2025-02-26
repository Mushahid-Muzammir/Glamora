import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../data_interface';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-inventory',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  constructor(
    private adminService : AdminService,
    private router : Router
  ) {}
  
  products : Product[] = [];
  filteredProducts : any[] =[];
  searchText: string = '';
  currentPage: number = 1;   
  itemsPerPage: number = 5;


    ngOnInit(): void {
    this.adminService.getProducts().subscribe(
      (res: any) => {
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

  editProduct(product : Product){
    this.router.navigate(['editProduct', product.product_id]);
  }
}
