import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-service',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {

  service_id !: number;
  serviceForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService : AdminService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {

    this.service_id = Number(this.route.snapshot.paramMap.get('service_id') || '');
    this.serviceForm = this.formBuilder.group(
      {
        service_name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        duration: ['', Validators.required]
      });   
      this.getService()
  }

  getService(){
    this.adminService.getServiceById(this.service_id).subscribe(
      (res:any) => {
        this.serviceForm.patchValue(res.service)
      });
  }

  confirmUpdate() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this service?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.onUpdateService(); 
          Swal.fire('Updated!', 'The service has been updated.', 'success');
        }
      });
    }

  onUpdateService(){
    this.adminService.editService(this.service_id, this.serviceForm.value).subscribe(
      () => {
        this.router.navigate(['services']);
      });
  }
  

}
