import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { CommonModule } from  '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Branch } from '../../../data_interface';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Manager } from '../../../data_interface';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-branch',
    imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
    templateUrl: './admin-branch.component.html',
    styleUrl: './admin-branch.component.css'
})
export class AdminBranchComponent implements OnInit {
    searchText: string = '';
    branches : Branch[] = []
    filteredBranches : any[] =[];
    currentPage: number = 1;   
    itemsPerPage: number = 5;
    managers: Manager[] = []
    branchForm !: FormGroup
    showForm: boolean = false; 


  constructor(
    private adminService : AdminService,
      private router: Router,
      private formbuilder: FormBuilder,
  ){}

    ngOnInit(): void {
        this.branchForm = this.formbuilder.group(
        {
            name: ['', Validators.required],
            address: ['', Validators.required],
            contact: ['', [
                Validators.required,
                Validators.pattern('^[0-9]{10}$')
            ]],
            manager_id: ['', Validators.required],
            open_time: ['', Validators.required],
            close_time: ['', Validators.required]
        });

        this.adminService.getManagers().subscribe(
            (res: any) => {
                this.managers = res.managers;
            });

        this.adminService.getBranches().subscribe(
          (res : any) => {
            this.branches = res.branches;
            this.filteredBranches = [...this.branches]; 
          });
    }

      filterBranches() {
        const searchTextLower = this.searchText.toLowerCase();
        this.filteredBranches = this.branches.filter(
          (branch) =>
            branch.branch_id.toString().includes(searchTextLower) ||
            branch.branch_name.toLowerCase().includes(searchTextLower)
        );
    }

  editBranch(branch : Branch){
    this.router.navigate(['editBranch', branch.branch_id]);
    }

    confirmDeleteBranch(branch_id : number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this branch?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteBranch(branch_id);
                Swal.fire('Updated!', 'The branch has been deleted.', 'success');
            }
        });
    }

    deleteBranch(branch_id: number) {
        this.adminService.deleteBranch(branch_id).subscribe(
        () => {
            this.router.navigate(['/branches']);
            this.adminService.getBranches().subscribe(
                (res: any) => {
                    this.branches = res.branches;
                    this.filteredBranches = [...this.branches];
                });
        });
        
    }  

    closePopup() {
        this.showForm = false;
    }

    openPopup() {
        this.showForm = true;
    }

    onAddbranch() {
        if (this.branchForm.invalid) {
            return;
        }

        this.adminService.addBranch(this.branchForm.value).subscribe({
            next: () => {
            alert('Branch created successfully!');
            this.branchForm.reset();
            this.showForm = false;
            this.router.navigate(['/branches']);
            this.adminService.getBranches().subscribe(
                (res: any) => {
                    this.branches = res.branches;
                    this.filteredBranches = [...this.branches];
                });             
            },
            error: (err) => {
                console.error('Error creating branch:', err);
                alert('Failed to create branch. Please try again.');
            }
        });
    }
}
