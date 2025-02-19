import { Component, Inject, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manager-add-product.component.html',
  styleUrl: './manager-add-product.component.css'
})
export class ManagerAddProductComponent implements OnInit {
  userId !: number;
  branchId !: number


  constructor(
    private managerService : ManagerService, 
    private authService : AuthService,
    private formBuild: FormBuilder, 
    private router : Router
  ){}
  productForm !: FormGroup;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    
    this.managerService.getBranchById(this.userId).subscribe(
      (res: any) => {
        this.branchId = res.manager.branch_id;
        console.log("Branch ID:", this.branchId);
        
        this.productForm.patchValue({
          branch: this.branchId
        });
      },
      (error) => console.error("Error fetching branch ID:", error)
    );
    this.productForm = this.formBuild.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        cost_price: ['', Validators.required],
        selling_price: ['', Validators.required],
        stock: ['', Validators.required],
        branch: [null],
        expiry_date: ['', Validators.required]
      });    
  }

  onAddproduct(){
    this.managerService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.router.navigate(["/managerInventory"]);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      }
    });
  }

}
