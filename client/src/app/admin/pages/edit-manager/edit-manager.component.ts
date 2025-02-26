import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-manager',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-manager.component.html',
  styleUrl: './edit-manager.component.css'
})
export class EditManagerComponent implements OnInit{

  user_id !: number;
  managerForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService : AdminService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {

    this.user_id = Number(this.route.snapshot.paramMap.get('user_id') || '');
    this.managerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.email],
        contact: ['', Validators.required],
        salary: ['', Validators.required]
      });   
      this.getManager()
  }

  getManager(){
    this.adminService.getManagerById(this.user_id).subscribe(
      (res:any) => {
        this.managerForm.patchValue(res.manager)
      });
  }

confirmUpdate() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this manager?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onUpdateManager(); 
        Swal.fire('Updated!', 'The manager has been updated.', 'success');
      }
    });
  }

  onUpdateManager(){
  this.adminService.editManager(this.user_id, this.managerForm.value).subscribe(
    () => {
      this.router.navigate(['managers']);
    });
  }
}
