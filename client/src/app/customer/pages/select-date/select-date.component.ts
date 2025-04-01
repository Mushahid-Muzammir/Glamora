import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-select-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent implements OnInit {
  selectedServices: number[] = [];
  selectedSpecialServices : number[] = [];
  serviceDetails : any[] = [];
  selectedDate: string = '';
  selectedBranch!: number;
  selectedEmployee !: any;
  totalPrice !: number;
  branchName: string = '';
  branch !: any;
  branch_id !: number;
  userId!: number;
  customerId!: number;
  totalDuration: number = 0;
  availableSlots: any[] = [];
  selectedSlot: any = null;
  today: string = new Date().toISOString().split('T')[0]; 
  showPopup: boolean = false;
  type: string = '';

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
    this.clientService.getCustomerById(this.userId).subscribe(
      (res : any) => {
        this.customerId = res.customer.customer_id;
        console.log('Customer ID:', this.customerId);
      },
      error => console.error('Error fetching customer:', error)
    );
    this.clientService.getEmployeeById(this.selectedEmployee).subscribe(
      (res : any) => {
        this.selectedEmployee = res.employee;
        console.log("Employee Details", this.selectedEmployee)
      });
  }

  private extractQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedBranch = Number(params['branch_id']);
      this.selectedEmployee = Number(params['employee_id']);
      this.selectedServices = params['services'] ? params['services'].split(',').map(Number) : [];
      this.selectedSpecialServices = params['special_services'] ? params['special_services'].split(',').map(Number) : [];
      this.totalPrice = Number(params['total_price']);
      console.log("Selected Special Services", this.selectedSpecialServices);

        this.fetchServicesDuration();
        const serviceIds = this.selectedServices.join(',');
        const specialServiceIds = this.selectedSpecialServices.join(',')
        if(this.selectedServices.length > 0){
          this.clientService.getServiceDetails(serviceIds).subscribe(
            res => {
              this.serviceDetails = res.services;
                  console.log("Special Services", this.serviceDetails);
                  this.type = "regular";

            },
              error => console.error('Error fetching service durations:', error)
            );
        }else{
          this.clientService.getSpecialServiceDetails(specialServiceIds).subscribe(
            res => {
              this.serviceDetails = res.services;
                  console.log("Special Services", this.serviceDetails);
                  this.type = "special";
            },
              error => console.error('Error fetching service durations:', error)
            );
          }
      });
    }

  private fetchUserData(): void {
    this.clientService.getBranchbyId(this.selectedBranch).subscribe(
      res => {
        this.branch = res.branch[0] || 'Unknown Branch';
        console.log('Branch :', this.branch);
      },
      error => console.error('Error fetching branch:', error)
    );
  }

  private fetchServicesDuration(): void {
    const serviceIds = this.selectedServices.join(',');
    const specialServiceIds = this.selectedSpecialServices.join(',')
    if(serviceIds){
      this.clientService.getServiceDetails(serviceIds).subscribe(
        res => {
              this.calculateTotalDuration(res.services);

        },
        error => console.error('Error fetching service durations:', error)
      );
    }else{
      this.clientService.getServiceDetails(specialServiceIds).subscribe(
        res => {
          this.calculateTotalDuration(res.services);
        },
        error => console.error('Error fetching service durations:', error)
      );
    }
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
        date: this.selectedDate,
        start_time: this.selectedSlot.start_time,
        end_time: this.selectedSlot.end_time,
        amount: this.totalPrice,
        type: this.type,
        services: this.selectedServices ? this.selectedServices : this.selectedSpecialServices,
    };

    console.log('Booking Data:', bookingData);

    this.clientService.confirmBooking(bookingData).subscribe(
      () => {
        Swal.fire('Appointment Confirmed!', 'Please check your email for details', 'success');
        this.showPopup = false;
        this.router.navigate(['/home']);
      },
      error => console.error('Error confirming booking:', error)
    );
  }

  closePopup(){
    this.showPopup = false;
  }

  openPopup(){
    this.showPopup = true;
  }
}
