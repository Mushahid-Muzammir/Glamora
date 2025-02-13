import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-select-date',
  imports: [ CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule ],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent implements OnInit {
  selectedServices : number[] = [];
  selectedDate : string = '';
  selectedBranch!: number;
  branchName !: string
  user_id !: number;
  customer_id !: number;
  totalDuration : number = 0 ;
  availableSlots: any[] = [];
  selectedSlot: any = null;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private clientService : ClientService,
    private authservice : AuthService
    
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.selectedBranch  = params['branch_id'];
      this.selectedServices = params['services'] ? params['services'].split(',').map(Number) : [];
      if (this.selectedServices.length > 0) {
        this.fetchServicesDuration();
      }  
      console.log('Selected Services:', this.selectedServices);
      console.log('branch_id', this.selectedBranch);
    });

    this.clientService.getBranchbyId(this.selectedBranch).subscribe(
      (res) => {
        this.branchName = res.branch[0].branch_name;
        console.log("This branch" ,res.branch[0].branch_name);
      });

      this.user_id = this.authservice.getUserId();
      console.log("user id", this.user_id)
      
    this.clientService.getCustomerById(this.user_id).subscribe(
      (res) => {
        this.customer_id = res.customer[0].customer_id;
        console.log("customer_id", this.customer_id);
      });  
  }

  fetchServicesDuration() {
    const serviceIds = this.selectedServices.join(',');  
    this.clientService.getDuration(serviceIds).subscribe(
      (response) => {
        this.calculateTotalDuration(response.services);

      },
      error => {
        console.error("Error fetching service durations:", error);
      });
  }

  calculateTotalDuration(services: { service_id : number, duration: number}[]){
    this.totalDuration = services.reduce((sum, service) => sum + service.duration, 0);
    console.log("Total:",this.totalDuration);   
  }

  onDateChange(){
    if (!this.selectedDate) {
      alert("Please select a date.");
      return;
    }
      console.log("Date to be sent:", this.selectedDate);
  
    // Proceed to fetch slots
    this.clientService.getAvailableSlots(this.selectedBranch, this.selectedDate, this.totalDuration).subscribe(
      response => {
        this.availableSlots = response.availableSlots;
        console.log("Fetched available slots:", this.availableSlots);
      },
      error => {
        console.error("Error fetching slots:", error);
      }
    );  }

  selectSlot(slot: any) {
    this.selectedSlot = slot;
  }
  
  confirmBooking() {
    if (!this.selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
   
    const bookingData = {
      branch_id: this.selectedBranch,
      customer_id : this.customer_id ,
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
