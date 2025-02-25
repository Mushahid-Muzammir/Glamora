import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-select-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent implements OnInit {
  selectedServices: number[] = [];
  selectedDate: string = '';
  selectedBranch!: number;
  selectedEmployee!: number;
  branchName: string = '';
  userId!: number;
  customerId!: number;
  totalDuration: number = 0;
  availableSlots: any[] = [];
  selectedSlot: any = null;
  today: string = new Date().toISOString().split('T')[0]; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.extractQueryParams();
    this.fetchUserData();
    this.userId = this.authService.getUserId();
    console.log('User ID:', this.userId);

    this.clientService.getCustomerById(this.userId).subscribe(
      (res : any) => {
        this.customerId = res.customer.customer_id;
        console.log('Customer ID:', this.customerId);
      },
      error => console.error('Error fetching customer:', error)
    );
  }

  private extractQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedBranch = Number(params['branch_id']);
      this.selectedEmployee = Number(params['employee_id']);
      this.selectedServices = params['services'] ? params['services'].split(',').map(Number) : [];

      if (this.selectedServices.length > 0) {
        this.fetchServicesDuration();
      }

      console.log('Selected Services:', this.selectedServices);
      console.log('Selected Branch ID:', this.selectedBranch);
    });
  }

  private fetchUserData(): void {

    this.clientService.getBranchbyId(this.selectedBranch).subscribe(
      res => {
        this.branchName = res.branch?.[0]?.branch_name || 'Unknown Branch';
        console.log('Branch Name:', this.branchName);
      },
      error => console.error('Error fetching branch:', error)
    );
  }

  private fetchServicesDuration(): void {
    const serviceIds = this.selectedServices.join(',');
    this.clientService.getDuration(serviceIds).subscribe(
      res => this.calculateTotalDuration(res.services),
      error => console.error('Error fetching service durations:', error)
    );
  }

  private calculateTotalDuration(services: { service_id: number; duration: number }[]): void {
    this.totalDuration = services.reduce((sum, service) => sum + service.duration, 0);
    console.log('Total Duration:', this.totalDuration);
  }

  onDateChange(): void {
    if (!this.selectedDate) {
      alert('Please select a date.');
      return;
    }

    console.log('Selected Date:', this.selectedDate);

    this.clientService.getAvailableSlots(this.selectedBranch, this.selectedDate, this.totalDuration).subscribe(
      res => {
        this.availableSlots = res.availableSlots || [];
        console.log('Available Slots:', this.availableSlots);
      },
      error => console.error('Error fetching slots:', error)
    );
  }

  selectSlot(slot: any): void {
    this.selectedSlot = slot;
  }

  confirmBooking(): void {
    if (!this.selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    const bookingData = {
      branch_id: this.selectedBranch,
      customer_id: this.customerId,
      employee_id: this.selectedEmployee,
      date: this.selectedDate,
      start_time: this.selectedSlot.start_time,
      end_time: this.selectedSlot.end_time
    };

    console.log('Booking Data:', bookingData);

    this.clientService.confirmBooking(bookingData).subscribe(
      () => {
        alert('Booking confirmed successfully!');
        this.router.navigate(['/home']);
      },
      error => console.error('Error confirming booking:', error)
    );
  }
}
