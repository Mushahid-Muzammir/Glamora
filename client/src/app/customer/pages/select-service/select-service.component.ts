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
  serviceForm !: FormGroup;
  branch_id !: number;
  selectedServices: number[] = [];
  selectedEmployeeId !: number;

  
  constructor(
    private clientService : ClientService,
    private route : ActivatedRoute,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.branch_id = Number(this.route.snapshot.paramMap.get('branch_id') || '');
    console.log(this.branch_id);

    this.clientService.getEmployees(this.branch_id).subscribe(
      (res : any) =>{
        this.employees = res.employees;
      });  
  }

  onScroll(event: WheelEvent) {
    event.preventDefault(); 
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft += event.deltaY; 
  }

  selectEmployee(employeeId : number){
    this.selectedEmployeeId = employeeId;
    console.log("Selected Employee:", this.selectedEmployeeId);
    setTimeout(() => {
      this.serviceSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    this.clientService.getEmployeeServices(employeeId).subscribe(
      (res : any) =>{
        this.services = res.services;
        console.log("The Services",this.services);
        this.filteredServices = [...this.services];
      });
  }

  toggleService(service_id:number, event:any){
    if(event.checked){
      this.selectedServices.push(service_id);
      setTimeout(() => {
        this.confirmButton?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }else{
      this.selectedServices = this.selectedServices.filter(id => id !== service_id);
    }
  }

  onSelectServices(){
    this.router.navigate(['/date'], { 
      queryParams: { 
        services : this.selectedServices.join(','), 
        branch_id : this.branch_id,
        employee_id : this.selectedEmployeeId 
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
