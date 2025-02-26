import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import { Product } from '../../../data_interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  totalAmount: number = 0;
  showPopup: boolean = false;
  showConfirmationPopup: boolean = false;


  constructor(
    private clientService: ClientService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.clientService.getProducts().subscribe(
      (res: any) => {
        this.products = res.products;
      },
      error => console.error("Error fetching products:", error)
    );
  }

  addtoCart(product: Product): void {
    this.cart.push(product);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cart.reduce((total, item) => total + item.selling_price, 0);
  }

  confirmCart(): void {
    if (this.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    this.showPopup = true;
  }


  processPayment(paymentType: string): void {
  if (paymentType === 'Pending') {
    this.showConfirmationPopup = true; // Show confirmation popup for "Pay Later"
    return;
  }

  this.finalizePayment(paymentType);
}

finalizePayment(paymentType: string): void {

  this.router.navigate(['/home']);
  const saleData = {
    items: this.cart,
    total_amount: this.totalAmount,
    payment_type: paymentType
  };

  this.clientService.processSale(saleData).subscribe(
    (res: any) => {
      alert("Sale processed successfully!");
      this.cart = [];
      this.totalAmount = 0;
      this.showPopup = false;
      this.showConfirmationPopup = false; // Hide confirmation popup after processing
    },
    error => console.error("Error processing sale:", error)
  );
}

closeConfirmationPopup(): void {
  this.showConfirmationPopup = false;
}


  closePopup(): void {
    this.showPopup = false;
  }
}
