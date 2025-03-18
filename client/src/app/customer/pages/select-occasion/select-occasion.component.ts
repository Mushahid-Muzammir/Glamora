import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCheckboxModule} from '@angular/material/checkbox'
import { CommonModule} from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Employee, Service } from '../../../data_interface';
import { ClientService } from '../../../services/client.service';
import { MatTabsModule } from '@angular/material/tabs'

@Component({
  selector: 'app-select-occasion',
  imports: [RouterModule, MatCheckboxModule, CommonModule, FormsModule, MatTabsModule, HeaderComponent],
  templateUrl: './select-occasion.component.html',
  styleUrl: './select-occasion.component.css'
})
export class SelectOccasionComponent implements OnInit {
    @ViewChild('confirmButton') confirmButton !: ElementRef
  

  branch_id !: number;
  branch !: any;
  employees : Employee[] = [];
  services !: any;
  categorizedServices : { [key : string]: any[] } = {};
  selectedServices: number[] = [];
  totalPrice : number = 0;
  serviceDetails : any[] = [];
  serviceEmployees !: any ;
  selectedEmployee !: any;
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
      });  
    this.clientService.getSpecialServices().subscribe(
      (res : any) => {
        this.services = res.services
        this.groupServicesByCategory();
        console.log(res.services)
      });  
  }

  groupServicesByCategory() {
    this.categorizedServices = this.services.reduce((acc :any, service : any) => {
      const category = service.service_category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {});
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
    this.fetchEmployees();
  }

  private fetchServicesDetails(): void {
    const serviceIds = this.selectedServices.join(',');
    console.log('Service IDs:', serviceIds);
    this.clientService.getSpecialServiceDetails(serviceIds).subscribe(
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

  private fetchEmployees(): void {
    const serviceIds = this.selectedServices.join(',');
    console.log('Service IDs:', serviceIds);
    this.clientService.getServiceEmployees(serviceIds).subscribe(
      res => {
        this.serviceEmployees = res.employees
        console.log(res.employees);
      },
      error => console.error('Error fetching service durations:', error)
    );
  }

  selectEmployee(employeeId : number){
    this.selectedEmployeeId = employeeId;
    console.log("Selected Employee:", this.selectedEmployeeId); 
    this.clientService.getEmployeeById(employeeId).subscribe(
      (res : any) => {
        this.selectedEmployee = res.employee;
        console.log("Employee Details", this.selectedEmployee)
      });
  }

  onSelectServices(){
    this.router.navigate(['/date'], { 
      queryParams: { 
        special_services : this.selectedServices.join(','), 
        branch_id : this.branch_id,
        employee_id : this.selectedEmployeeId,
        total_price : this.totalPrice 
      }
    });
  }


  
}
