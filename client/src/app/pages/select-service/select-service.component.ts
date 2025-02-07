import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCheckboxModule} from '@angular/material/checkbox'
import { CommonModule} from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Service } from '../../interfaces';

@Component({
  selector: 'app-select-service',
  imports: [RouterModule, MatCheckboxModule, CommonModule],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent implements OnInit {

  services: Service[] = [];
  serviceForm !: FormGroup;
  branch_id !: number;
  selectedServices: number[] = [];

  
  constructor(
    private clientService : ClientService,
    private route : ActivatedRoute,
    private router : Router,

  ) {}

  ngOnInit(): void {
    this.branch_id = Number(this.route.snapshot.paramMap.get('branch_id') || '');
    console.log(this.branch_id);

    this.clientService.getServices().subscribe(
      (res:any) => {
        this.services = res.services;
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
    this.router.navigate(['/date'], { queryParams: { services : this.selectedServices.join(','), branch_id: this.branch_id}});
  }
}
