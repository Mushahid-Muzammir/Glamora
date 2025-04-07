import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCheckboxModule} from '@angular/material/checkbox'
import { CommonModule} from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Employee, Service } from '../../../data_interface';

@Component({
  selector: 'app-select-service',
  imports: [RouterModule, MatCheckboxModule, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent implements OnInit {
  @ViewChild('employeeContainer', { static:false }) slider!: ElementRef;
  scrollSpeed = 0.3; 
  animationFrame: any;
  @ViewChild('serviceSection') serviceSection !: ElementRef
  @ViewChild('confirmButton') confirmButton !: ElementRef

    searchText : string = '';
    filteredServices : Service[] = [];
    services: any[] = [];
    serviceDetails : any[] = [];
    selectedGender: string | null = null;
    serviceForm !: FormGroup;
    branch !: any;
    selectedEmployee !: any;
    branch_id !: number;
    selectedServices: number[] = [];
    serviceEmployees !: any;
    totalPrice : number = 0;
    selectedEmployeeId !: number;
    selectedEmployees: { [key: number]: any } = {};

  constructor(
    private clientService : ClientService,
    private route : ActivatedRoute,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.branch_id = Number(this.route.snapshot.paramMap.get('branch_id') || '');
    this.clientService.getBranchbyId(this.branch_id).subscribe(
      (res : any) => {
        this.branch = res.branch[0];
      });  
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.clientService.getServicesByGender(this.selectedGender).subscribe(
        (res: any) => {
            this.services = res.services;
            this.filteredServices = this.services;
      });
    }

  toggleServices(service_id: number, event: any) {
    if (event.checked) {
        this.selectedServices.push(service_id);
    } else {
        this.selectedServices = this.selectedServices.filter(id => id !== service_id);
      }
      this.fetchServicesDetails();
    }

    private fetchServicesDetails(): void {
        const serviceIds = this.selectedServices.join(',');
        this.clientService.getServiceDetails(serviceIds).subscribe(
            res => {
                this.serviceDetails = res.services;
                this.calculateTotalPrice(this.serviceDetails);
            },
            error => console.error('Error fetching service details:', error)
        );
        this.fetchEmployees();
    }

    private calculateTotalPrice(services: { service_id: number; price: number }[]): void {
        this.totalPrice = services.reduce((sum, service) => sum + service.price, 0);
        console.log('Total Price:', this.totalPrice);
    }
   
  fetchEmployees() {
    const serviceIds = this.selectedServices.join(',');
    this.clientService.getServiceEmployees(serviceIds).subscribe(
        (res: any) => {
            this.serviceEmployees = res.employees;
        },
        error => console.error('Error fetching Employees:', error)
    )
  }

  selectEmployee(employee: any) {
    for (let service of this.serviceDetails) {
        this.selectedEmployees[service.service_id] = employee;
    }
    this.selectedEmployee = employee;
  }

    isSelectedEmployee(employeeId: number) {
        return Object.values(this.selectedEmployees).some(
            (selected) => selected.employee_id === employeeId
        );
    }

    selectEmployeePerService() {
        const serviceIds = this.selectedServices.join(',');
        this.router.navigate(['/employeeService'], {
            queryParams: {
                services: serviceIds,
                branch_id: this.branch_id,
                total_price: this.totalPrice
            }
        });
    }

  onSelectServices(){
    this.router.navigate(['/date'], { 
      queryParams: { 
        services : this.selectedServices.join(','), 
        branch_id : this.branch_id,
        employee_id : this.selectedEmployeeId,
        total_price : this.totalPrice 
      }
    });
  }

  filterServices() {
    const searchTextLower = this.searchText.toLowerCase();
      this.filteredServices = this.services.filter(
      (service) =>
        service.service_name.toLowerCase().includes(searchTextLower)
    );
   }

}
