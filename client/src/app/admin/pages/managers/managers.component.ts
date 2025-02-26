import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { AdminService } from '../../../services/admin.service';
import { Manager } from '../../../data_interface'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-managers',
  imports: [SidebarComponent, TopbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent implements OnInit{
  managers: Manager[] = [];
  filteredManagers : any[] =[];
  searchText: string = '';

  constructor(
    private adminService: AdminService,
    private router :Router
  ) { }
  
    ngOnInit(): void {
      this.adminService.getManagers().subscribe(
        (res: any) => {
        this.managers = res.managers;
        console.log(this.managers);
        this.filteredManagers = [...this.managers]; 

      },
      (error) => {
        console.error('Error fetching employees:', error);
      });
    }

    filterManagers() {
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredManagers = this.managers.filter(
        (manager) =>
          manager.manager_id.toString().includes(searchTextLower) ||
          manager.name.toLowerCase().includes(searchTextLower)
      );
  }
  
    editManager(manager: Manager){
      this.router.navigate(['/editManager', manager.user_id]);
    }
}
