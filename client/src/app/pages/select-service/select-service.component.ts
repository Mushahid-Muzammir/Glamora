import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule} from '@angular/material/checkbox'
@Component({
  selector: 'app-select-service',
  imports: [RouterModule, MatCheckboxModule],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.css'
})
export class SelectServiceComponent {

}
