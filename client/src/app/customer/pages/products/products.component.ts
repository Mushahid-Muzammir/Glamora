import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Product } from '../../../data_interface';
import { Router } from '@angular/router';
import swt from 'sweetalert2'

@Component({
  selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  totalAmount: number = 0;
  showPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  searchText !: string;
  filteredProducts : Product[] =[];
  userId!: number;
  customerId!: number;

  constructor(
    private clientService: ClientService,
    private router : Router,
    private authService: AuthService
    
  ) {}

  ngOnInit(): void {
    this.clientService.getProducts().subscribe(
      (res: any) => {
        this.products = res.products;
        this.filteredProducts = [...this.products]
      },
      error => console.error("Error fetching products:", error)
    );

    this.userId = this.authService.getUserId();
    this.clientService.getCustomerById(this.userId).subscribe(
      (res : any) => {
        this.customerId = res.customer.customer_id;
      },
      error => console.error('Error fetching customer:', error)
    );
  }

  filterProducts() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.product_name.toLowerCase().includes(searchTextLower)
    );
  }
  
  addtoCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product_id === product.product_id); 
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.calculateTotal();
  }

  increaseQuantity(item: Product): void {
    item.quantity += 1;
    this.calculateTotal();
  }
  
  decreaseQuantity(item: Product): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.cart = this.cart.filter(cartItem => cartItem.product_id !== item.product_id);
    }
    this.calculateTotal();
  }
  
  calculateTotal(): void {
    this.totalAmount = this.cart.reduce((total, item) => total + item.selling_price * item.quantity, 0);
  }

  confirmCart(): void {
    if (this.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    this.showPopup = true;
  }

    processPayment(paymentType: string): void {
        this.showPopup = false;
  if (paymentType === 'Pending') {
    this.showConfirmationPopup = true; 
    return;
  }
  this.finalizePayment();
}

  finalizePayment(): void {
    const saleData = {
    items: this.cart,
    customer_id: this.customerId,
    total_amount: this.totalAmount,
  };

  this.clientService.processSale(saleData).subscribe(
      (res: any) => {
      this.showConfirmationPopup = false;
        swt.fire({
            title: 'Success',
            text: 'Sale processed successfully, You can collect the product at any of our branches',
            icon: 'success',
            confirmButtonText: 'OK'  
        });  
      this.router.navigate(['/home']);
      this.cart = [];
      this.totalAmount = 0;
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
