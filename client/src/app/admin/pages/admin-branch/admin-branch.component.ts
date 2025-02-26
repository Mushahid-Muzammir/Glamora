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


@Component({
  selector: 'app-admin-branch',
  imports: [SidebarComponent, TopbarComponent, CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './admin-branch.component.html',
  styleUrl: './admin-branch.component.css'
})
export class AdminBranchComponent implements OnInit {
searchText: string = '';
branches : Branch[] = []
filteredBranches : any[] =[];
currentPage: number = 1;   
itemsPerPage: number = 5;


  constructor(
    private adminService : AdminService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.adminService.getBranches().subscribe(
      (res : any) => {
        this.branches = res.branches;
        console.log(this.branches);
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
}
