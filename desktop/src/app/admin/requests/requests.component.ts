import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  requests: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getRequests().subscribe(
      (res: any) => {
        this.requests = res.requests;
        console.log("Requests", this.requests);
      });
  }

  updateRequestStatus(request: any, status: string): void {
    request.status = status; 
    this.adminService.updateLeaveStatus(request.leave_id, status).subscribe(
      (res: any) => {
        console.log(`Request #${request.leave_id} updated to ${status}`);
      },
      (error: any) => {
        console.error('Failed to update request status', error);
      });
  }
}
