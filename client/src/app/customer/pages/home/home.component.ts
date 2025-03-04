import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { Service } from '../../../data_interface';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  scrollSpeed = 0.3; 
  animationFrame: any;
  services: Service[] = [];

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnInit(): void {
    this.clientService.getServices().subscribe(
      (res : any) => {
      this.services = res.services;
    });
  }

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) { }

  startAutoScroll() {
    const container = this.scrollContainer.nativeElement;
    const scroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 10 }); // Reset scroll
      } else {
        container.scrollLeft += this.scrollSpeed; // Move right
      }
      this.animationFrame = requestAnimationFrame(scroll);
    };
    scroll();
  }

  stopAutoScroll() {
    cancelAnimationFrame(this.animationFrame);
  }

  onScroll(event: WheelEvent) {
    event.preventDefault(); 
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft += event.deltaY; 
  }
  

  startService() {
    if (this.authService.getLoggedIn()) {
      this.router.navigate(['/branch']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -500, behavior: 'smooth' });
  }
  
  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 500, behavior: 'smooth' });
  }
}
