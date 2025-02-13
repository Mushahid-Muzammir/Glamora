import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from  '@angular/common'
import  { AdminService } from '../../services/admin.service'
import { Branch } from '../../data_interface';

@Component({
  selector: 'app-admin-branch',
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './admin-branch.component.html',
  styleUrl: './admin-branch.component.css'
})
export class AdminBranchComponent implements OnInit {
branches : Branch[] = []

  constructor(
    private adminService : AdminService
  ){}

  ngOnInit(): void {
    this.adminService.getBranches().subscribe(
      (res : any) => {
        this.branches = res.branches;
        console.log(this.branches);
      }
    )
  }

}
