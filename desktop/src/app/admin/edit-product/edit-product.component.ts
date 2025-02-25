  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AdminService } from '../../services/admin.service';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productForm !: FormGroup;
  product_id !: number;
  selectedFile !: File | null;
  imagePreview : string | ArrayBuffer | null=null;


  constructor(
    private adminService : AdminService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void{
    this.product_id = Number(this.route.snapshot.paramMap.get('product_id') || '');
    console.log(this.product_id);

    this.productForm = this.formBuilder.group(
      {
        product_name: ['', Validators.required],
        description: ['', Validators.required],
        cost_price: ['', Validators.required],
        selling_price: ['', Validators.required],
        stock_level: ['', Validators.required],
        expiry_date: ['', Validators.required],
        category: ['', Validators.required],
        image_url: ['']
      });

      this.getProduct();
  }

  getProduct() {
    this.adminService.getProductById(this.product_id).subscribe(
      (res: any) => {
        console.log(res.product);
        
        if (res.product.expiry_date) {
          const date = new Date(res.product.expiry_date);
          res.product.expiry_date = date.toISOString().split("T")[0]; // Format to "yyyy-MM-dd"
        }
          this.productForm.patchValue(res.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      });
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  confirmUpdate() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onUpdateProduct(); 
        Swal.fire('Updated!', 'The product has been updated.', 'success');
      }
    });
  }
  
  onUpdateProduct(){
    this.adminService.editProduct(this.product_id, this.productForm.value).subscribe(
      () => {
        console.log("Form Value at front end:",this.productForm.value);
        Swal.fire({
          title:"Are You Sure?",
          text:"you want to update this branch",
          
        })
        this.router.navigate(['inventory']);
      });
  }
}
