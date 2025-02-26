import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private adminService: AdminService,
    private formBuild: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost_price: ['', Validators.required],
      selling_price: ['', Validators.required],
      stock: ['', Validators.required],
      expiry_date: ['', Validators.required],
      image_url: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  onAddProduct() {
    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.selectedImage) {
      formData.append('image_url', this.selectedImage);
    }
    console.log('Form data:', this.productForm.value);

    this.adminService.addProduct(formData).subscribe({
      next: () => {
        this.router.navigate(['/inventory']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      }
    });
  }
}
