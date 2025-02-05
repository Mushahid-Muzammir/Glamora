import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-select-date',
  imports: [ CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule ],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent implements OnInit {
  selectedServices : number[] = [];

  constructor(
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.selectedServices = params['services'] ? params['services'].split(',').map(Number) : [];
      console.log('Selected Services:', this.selectedServices);

    })
  }


}
