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
  @ViewChild('slider', { static:false }) slider!: ElementRef;

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

  selectEmployee(employeeId : number){
    this.selectedEmployeeId = employeeId;
    console.log("Selected Employee:", this.selectedEmployeeId);
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

  scrollLeft() {
    if (this.slider) {
      this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.slider) {
      this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  filterServices() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredServices = this.services.filter(
      (service) =>
        service.service_name.toLowerCase().includes(searchTextLower)
    );
  }
}
