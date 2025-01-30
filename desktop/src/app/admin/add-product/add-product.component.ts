import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  constructor(private adminService : AdminService, private formBuild: FormBuilder, private router : Router){}
  productForm !: FormGroup;

  ngOnInit(): void {
    this.productForm = this.formBuild.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        cost_price: ['', Validators.required],
        selling_price: ['', Validators.required],
        stock: ['', Validators.required],
        expiry_date: ['', Validators.required]
      });    
  }

  onAddproduct(){
    this.adminService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.router.navigate(["/inventory"]);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      }
    });
  }

}
