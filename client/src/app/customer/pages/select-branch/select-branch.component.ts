import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
// import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService} from '../../../services/client.service'
import { Branch } from '../../../data_interface';

@Component({
  selector: 'app-select-branch',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './select-branch.component.html',
  styleUrl: './select-branch.component.css'
})

export class SelectBranchComponent implements OnInit {

  branches : Branch[] = [];
  serviceType !: string;

  constructor(
    private clientService : ClientService,
    private router : Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.serviceType = params['serviceType'] || 'regular'
      }
    )
    this.clientService.getBranches().subscribe(
      (res: any) => {
        this.branches = res.branches;
      });
  }

  onSelectBranch(branch: Branch){
    if(this.serviceType === 'regular'){
      this.router.navigate(['/service', branch.branch_id]);
    }else{
      this.router.navigate(['/occasions', branch.branch_id]);
    }
  }

}
