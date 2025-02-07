import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-select-date',
  imports: [ CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule ],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent implements OnInit {
  selectedServices : number[] = [];
  selectedDate : string = '';
  selectedBranch!: number;

  constructor(
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.selectedServices = params['services'] ? params['services'].split(',').map(Number) : [];
      this.selectedBranch  = params['branch_id'];
      console.log('Selected Services:', this.selectedServices);
      console.log('branch_id', this.selectedBranch);

    })
  }

  onSelectDate(){
    if(this.selectedDate){
      this.router.navigate(['/time'], { queryParams: { date: this.selectedDate, services: this.selectedServices, branch_id: this.selectedBranch}});
    }
    else{
      alert('Please select a date!');
    }
  }
}
