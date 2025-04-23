import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AdminService } from '../../../services/admin.service';
import { Service } from '../../../data_interface';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
    imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(
    private adminService : AdminService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  services : Service[] = [];
  filteredServices : any[] =[];
  searchText: string = '';
  currentPage : number = 1;
  itemsPerPage: number = 5;
  serviceForm !: FormGroup
  showForm: boolean = false; 

  ngOnInit() :void {
    this.adminService.getServices().subscribe(
      (res:any) => {
        this.services = res.services;
        console.log(this.services);
        this.filteredServices = [...this.services]; 
        });

      this.serviceForm = this.formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          price: ['', [Validators.required, Validators.min(0)]],
          duration: ['', [Validators.required, Validators.min(1)]],
      });
  }

  filterServices() {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredServices = this.services.filter(
      (service) =>
        service.service_id.toString().includes(searchTextLower) ||
        service.service_name.toLowerCase().includes(searchTextLower)
    );
}

  editService(service: Service){
    this.router.navigate(['editService', service.service_id]);
    }

    closePopup() {
        this.showForm = false;
    }

    openPopup() {
        this.showForm = true;
    }

    onAddService() {
        if (this.serviceForm.invalid) {
            alert('Please fill in all required fields.');
            return;
        }

        this.adminService.addService(this.serviceForm.value).subscribe({
            next: () => {
                alert('Service created successfully!');
                this.router.navigate(['/services']);
            },
            error: (err) => {
                console.error('Error creating service:', err);
                alert('Failed to create service. Please try again.');
            }
        });
    }
}
