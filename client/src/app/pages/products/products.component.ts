import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products : Product[] = []
  cart : any[] = [];
  quantity !: number;
  totalAmount !: number
  constructor(
    private clientService : ClientService
  ){}

  ngOnInit(): void {
    this.clientService.getProducts().subscribe(
      (res : any) => {
        this.products = res.products
      });
  }

  addtoCart(product : Product){
    this.cart.push(product);
    this.calculateTotal();
  }

  calculateTotal(){
    this.totalAmount = this.cart.reduce((total, item) => total + item.selling_price, 0);
  }
}
