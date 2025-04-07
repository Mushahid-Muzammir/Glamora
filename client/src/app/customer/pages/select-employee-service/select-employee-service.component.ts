import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../data_interface';
import { Router } from '@angular/router'; 

@Component({
    selector: 'app-select-employee-service',
    imports: [HeaderComponent, MatCheckboxModule, CommonModule, FormsModule],
    templateUrl: './select-employee-service.component.html',
    styleUrl: './select-employee-service.component.css'
})

export class SelectEmployeeServiceComponent implements OnInit {
    selectedSpecialServices: number[] = [];
    selectedBranch!: number;
    serviceDetails: any[] = [];
    serviceEmployees: any[] = [];
    totalPrice !: number;
    branch !: any;
    showPopup: { [key: string]: boolean } = {};
    selectedEmployees: { [key: number]: any } = {};

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.selectedBranch = Number(params['branch_id']);
            this.selectedSpecialServices = params['services'] ? params['services'].split(',').map(Number) : [];
            this.totalPrice = Number(params['total_price']);   
        });
        this.fetchDetails();
    }    

    fetchDetails() {
        const specialServiceIds = this.selectedSpecialServices.join(',');
        this.clientService.getSpecialServiceDetails(specialServiceIds).subscribe(
            res => {
                this.serviceDetails = res.services;
                console.log("Special Services", this.serviceDetails);
            },
            error => console.error('Error fetching service durations:', error)
        );

        this.clientService.getBranchbyId(this.selectedBranch).subscribe(
            res => {
                this.branch = res.branch[0] || 'Unknown Branch';
            },
            error => console.error('Error fetching branch:', error)
        );
    }

    selectEmployee(serviceId: number) {
        this.showPopup[serviceId] = true;
        this.clientService.getEmployeeEachService(serviceId).subscribe(
            res => {
                this.serviceEmployees = res.employees || 'Unknown services';
                console.log("employee Services", this.serviceEmployees);

            },
            error => console.error('Error fetching employees:', error)
        );
    }

    selectedEmployee(employee: any, serviceId: number) {
        this.selectedEmployees[serviceId] = employee;
        this.showPopup[serviceId] = false;
    }

    anyPopupOpen(): boolean {
        return Object.values(this.showPopup).includes(true);
    }

    onSelectServices() {
        console.log("Services", this.selectedEmployees)
        this.router.navigate(['/date'], {
            queryParams: {
                special_services: this.selectedSpecialServices.join(','),
                branch_id: this.selectedBranch,
                employees: this.selectedEmployee,
                total_price: this.totalPrice,
                selectedList: JSON.stringify(this.selectedEmployees)
            }
        });
    }
}

