import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Manager } from '../../../data_interface';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-branch',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent implements OnInit{
  managers : Manager[] = []
  branchForm !: FormGroup
  constructor(
    private adminService : AdminService,
    private formbuilder : FormBuilder,
    private router : Router
  ){}

  ngOnInit(): void {
  this.branchForm = this.formbuilder.group(
    {
      name : ['', Validators.required],
      address : ['', Validators.required],
      contact : ['', Validators.required],
      manager_id: ['', Validators.required],
      open_time : ['', Validators.required],
      close_time : ['', Validators.required]
    });

    this.adminService.getManagers().subscribe(
      (res : any) => {
        this.managers = res.managers;
      });
  }

  onAddbranch() {
    if (this.branchForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.adminService.addBranch(this.branchForm.value).subscribe({
      next: () => {
        alert('Branch created successfully!');
        this.router.navigate(['/branches']); 
      },
      error: (err) => {
        console.error('Error creating branch:', err);
        alert('Failed to create branch. Please try again.');
      }
    });
  }
}
