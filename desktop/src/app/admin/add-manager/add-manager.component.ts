import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-manager',
  imports: [ReactiveFormsModule],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css'
})
export class AddManagerComponent implements OnInit {
  adminService = Inject(AdminService); 
  formBuild = Inject(FormBuilder);
  managerForm !: FormGroup;


  ngOnInit(): void {
    this.managerForm = this.formBuild.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.email],
        contact: ['', Validators.required],
        branch: ['', Validators.required]
      })    
  }

  onAddManager() {
  }

}
