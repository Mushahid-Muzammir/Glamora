import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-select-time',
  imports: [CommonModule],
  templateUrl: './select-time.component.html',
  styleUrl: './select-time.component.css'
})
export class SelectTimeComponent implements OnInit {
  selectedDate: string = '';
  selectedBranch !: number;
  user_id !: number | null;
  customer_id !: number;
  selectedServices : number[] = [];
  totalDuration : number = 0 ;
  availableSlots: any[] = [];
  selectedSlot: any = null;


  constructor(
    private route: ActivatedRoute,
    private clientService : ClientService,
    private authservice : AuthService,
    private router : Router
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {  
        this.selectedDate = params['date'];
        this.selectedBranch = params['branch_id'];
        this.selectedServices = Array.isArray(params['services'])
        ? params['services'].map(Number) 
        : typeof params['services'] === 'string'
          ? params['services'].split(',').map(Number)
          : [];
              if (this.selectedServices.length > 0) {
          this.fetchServicesDuration();
        }  
    });
  }

  fetchServicesDuration() {
    const serviceIds = this.selectedServices.join(',');  
    this.clientService.getDuration(serviceIds).subscribe(
      response => {
        this.calculateTotalDuration(response.services);
      },
      error => {
        console.error("Error fetching service durations:", error);
      });
  }

  calculateTotalDuration(services: { service_id : number, duration: number}[]){
    this.totalDuration = services.reduce((sum, service) => sum + service.duration, 0);
    if (this.totalDuration > 0) {
        this.fetchAvailableSlots();
    }    
  }

  fetchAvailableSlots() {
    this.clientService.getAvailableSlots(this.selectedBranch, this.selectedDate, this.totalDuration).subscribe(
      response => {
        this.availableSlots = response.availableSlots;
      },
      error => {
        console.error("error fetching slots:", error);
      });    
  }

  selectSlot(slot: any) {
    this.selectedSlot = slot;
  }

  confirmBooking() {
    if (!this.selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    this.user_id = this.authservice.getUserId();
    console.log("user id", this.user_id)
    this.clientService.getCustomerById(this.user_id).subscribe(
      (res) => {
        console.log("Response:", res);  // Log the full response to verify
        if (res && res.customer && res.customer.length > 0) {
          this.customer_id = res.customer[0].customer_id;
        }
      },
      (error) => {
        console.error("Error fetching customer:", error);
      });

    const bookingData = {
      branch_id: this.selectedBranch,
      customer_id : 1,
      date: this.selectedDate,
      start_time: this.selectedSlot.start_time,
      end_time: this.selectedSlot.end_time
    };
    console.log(bookingData);
    this.clientService.confirmBooking(bookingData).subscribe(
      (res) => {
        alert('Booking confirmed');
        this.router.navigate(['/home'])
      }
    )
  }

}
