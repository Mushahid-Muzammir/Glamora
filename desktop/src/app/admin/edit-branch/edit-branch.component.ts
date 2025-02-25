import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manager } from '../../data_interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-branch',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.css'
})
export class EditBranchComponent implements OnInit {
  branchForm !: FormGroup;
  branch_id !: number;
  managers : Manager[] =[]
  constructor(
    private adminService : AdminService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void{
    this.branch_id = Number(this.route.snapshot.paramMap.get('branch_id') || '');
    console.log(this.branch_id);

    this.branchForm = this.formBuilder.group(
      {
        branch_name : ['', Validators.required],
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

      this.getBranch();
  }

  getBranch() {
    this.adminService.getBranchById(this.branch_id).subscribe(
      (res: any) => {      
          console.log(res.branch);
          this.branchForm.patchValue(res.branch);
      },
      (error) => {
        console.error('Error fetching branch:', error);
      });
  }

  confirmUpdate() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this branch?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.onUpdateBranch(); 
          Swal.fire('Updated!', 'The branch has been updated.', 'success');
        }
      });
    }

  onUpdateBranch(){
    this.adminService.editBranch(this.branch_id, this.branchForm.value).subscribe(
      () => {
        console.log("Form Value at front end:",this.branchForm.value);
        this.router.navigate(['/branch']);
      });
  }

}
