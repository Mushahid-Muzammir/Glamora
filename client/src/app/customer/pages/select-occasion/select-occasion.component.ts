import { Component, OnInit } from '@angular/core';
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
  branch_id !: number;
  branch !: any;
  employees : Employee[] = [];
  services !: any;
  categorizedServices : { [key : string]: any[] } = {};

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
      console.log("AAc", acc)
      return acc;
    }, {});
  }
  
}
