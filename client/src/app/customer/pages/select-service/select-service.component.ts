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
  services: Service[] = [];
  employees : Employee[] = [];
  serviceDetails : any[] = [];
  selectedGender: string | null = null;
  serviceForm !: FormGroup;
  branch !: any;
  selectedEmployee !: any;
  branch_id !: number;
  selectedServices: number[] = [];
  totalPrice : number = 0;
  selectedEmployeeId !: number;
  
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
        console.log("Branch:",this.branch);
      });  
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.clientService.getEmployees(this.branch_id, this.selectedGender).subscribe(
      (res : any) =>{
        this.employees = res.employees;
      });
  }

  selectEmployee(employeeId : number){
    this.selectedEmployeeId = employeeId;
    console.log("Selected Employee:", this.selectedEmployeeId);
    setTimeout(() => {
      this.serviceSection?.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 2500);
    this.clientService.getEmployeeServices(employeeId).subscribe(
      (res : any) =>{
        this.services = res.services;
        this.filteredServices = [...this.services];
        this.clientService.getEmployeeById(employeeId).subscribe(
          (res : any) => {
            this.selectedEmployee = res.employee;
            console.log("Employee Details", this.selectedEmployee)
          });
      });  
  }

  toggleService(service_id:number, event:any){
    if(event.checked){
      this.selectedServices.push(service_id);
      this.fetchServicesDetails();
      setTimeout(() => {
        this.confirmButton?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }else{
      this.selectedServices = this.selectedServices.filter(id => id !== service_id);
    }
  }

  private fetchServicesDetails(): void {
    const serviceIds = this.selectedServices.join(',');
    console.log('Service IDs:', serviceIds);
    this.clientService.getServiceDetails(serviceIds).subscribe(
      res => {
        this.serviceDetails = res.services;
        this.calculateTotalPrice(res.services);
      },
      error => console.error('Error fetching service durations:', error)
    );
  }
  private calculateTotalPrice(services: { service_id: number; price: number }[]): void {
    this.totalPrice = services.reduce((sum, service) => sum + service.price, 0);
    console.log('Total Price:', this.totalPrice);
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
