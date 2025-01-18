import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-select-branch',
  imports: [
            FooterComponent,
            RouterModule
  ],
  templateUrl: './select-branch.component.html',
  styleUrl: './select-branch.component.css'
})
export class SelectBranchComponent {

}
