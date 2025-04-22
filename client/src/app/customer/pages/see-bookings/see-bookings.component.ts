import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';

@Component({
    selector: 'app-see-bookings',
    imports: [HeaderComponent, CommonModule],
  templateUrl: './see-bookings.component.html',
  styleUrl: './see-bookings.component.css'
})
export class SeeBookingsComponent {
    userId!: number;
    customerId!: number;
    bookings: any[] = [];

    constructor(
        private authService: AuthService,
        private clientService: ClientService
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.getUserId();
        console.log('User ID:', this.userId);
        this.clientService.getCustomerById(this.userId).subscribe(
            (res: any) => {
                this.customerId = res.customer.customer_id;
                console.log('Customer ID:', this.customerId);
                this.clientService.getMyBookings(this.customerId).subscribe(
                    (res: any) => {
                        this.bookings = res.bookings;
                    },
                    error => console.error('Error fetching bookings:', error)
                )
            },
            error => console.error('Error fetching customer:', error)
        );
    }

}
