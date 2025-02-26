import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StaffService } from '../../../services/staff.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveRequestForm!: FormGroup;
  userId!: number;
  employeeId!: number;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.staffService.getEmployeeById(this.userId).subscribe(
      (res: any) => {
        this.employeeId = res.employee.employee_id;
        console.log('Employee Id at leave request:', this.employeeId);
      },
      (error) => {
        console.error('Error fetching employee information:', error);
      });

    this.leaveRequestForm = this.fb.group({
      date: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]], // Added minLength validation
    });
  }

  onLeaveRequest() {
    if (!this.employeeId || this.leaveRequestForm.invalid) {
      alert('Employee information is not yet loaded or the form is invalid.');
      return;
    }

    this.isSubmitting = true;

    this.staffService.requestLeave(this.employeeId, this.leaveRequestForm.value).subscribe({
      next: (res) => {
        alert('Leave request submitted successfully.');
        this.router.navigate(['/staffHome']);
        this.leaveRequestForm.reset();
      },
      error: (err) => {
        console.error('Error submitting leave request:', err);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
