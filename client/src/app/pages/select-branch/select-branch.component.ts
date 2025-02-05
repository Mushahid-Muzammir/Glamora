import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService} from '../../services/client.service'
import { Branch } from '../../interfaces';

@Component({
  selector: 'app-select-branch',
  imports: [
            FooterComponent,
            RouterModule,
            CommonModule
  ],
  templateUrl: './select-branch.component.html',
  styleUrl: './select-branch.component.css'
})
export class SelectBranchComponent implements OnInit {

  branches : Branch[] = []

  constructor(
    private clientService : ClientService,
    private router : Router
  ) {}

  ngOnInit(): void {

    this.clientService.getBranches().subscribe(
      (res: any) => {
        this.branches = res.branches;
      }
    )
  }

  onSelectBranch(branch: Branch){
    this.router.navigate(['/service', branch.branch_id]);
  }

}
