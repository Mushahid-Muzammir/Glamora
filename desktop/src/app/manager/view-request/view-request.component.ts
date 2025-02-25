import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Request } from '../../data_interface';

@Component({
  selector: 'app-view-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-request.component.html',
  styleUrl: './view-request.component.css'
})
export class ViewRequestComponent implements OnInit {
  branchId !: number;
  userId !: number;
  requests: Request[] = [];

  constructor(
    private managerService: ManagerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log("UserId", this.userId);
    this.managerService.getBranchById(this.userId).subscribe(
      (res: any) => {
      this.branchId = res.manager.branch_id;
      this.managerService.getRequests(this.branchId).subscribe(
        (res: any) => {
          this.requests = res.requests;
          console.log("Requests", this.requests);
        });
    });
  }

  updateRequestStatus(request: any, status: string): void {
    request.status = status; 
    this.managerService.updateLeaveStatus(request.leave_id, status).subscribe(
      (res: any) => {
        console.log(`Request #${request.leave_id} updated to ${status}`);
      },
      (error: any) => {
        console.error('Failed to update request status', error);
      });
  }
}


