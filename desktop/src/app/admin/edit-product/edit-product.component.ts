  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AdminService } from '../../services/admin.service';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productForm !: FormGroup;
  product_id !: number;
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
        expiry_date: ['', Validators.required]
      });

      this.getProduct();
  }

  getProduct(){
    this.adminService.getProductById(this.product_id).subscribe(
      (res : any) => {
        this.productForm.patchValue(res.product)
      })
  }

  onUpdateProduct(){
    this.adminService.editProduct(this.product_id, this.productForm.value).subscribe(
      () => {
        console.log("Form Value at front end:",this.productForm.value);
        alert('Product updated successfully');
        this.router.navigate(['inventory']);
      });
  }
}
