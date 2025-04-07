import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Input, signal, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { Product, Service } from '../../../data_interface';
import { CarouselModule } from 'primeng/carousel';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule, FormsModule, CarouselModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [ 
                style({ opacity: 0 }),
                animate('1s ease-in-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [ 
                animate('1s ease-in-out', style({ opacity: 0 })),
            ]),
        ]),
    ],
})

export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
    scrollSpeed = 0.3;
    animationFrame: any;
    services: Service[] = [];
    activeIndex = 0;
    @Input() items: { title: string; description: string }[] = [];
    currentIndex = signal(0);
    intervalId: any;
    products: any[] = [];
    testimonials: any[] = [];

    slides = [
        { title: 'Book with Ease!', description: 'Your Look is Just a Click Away', bg: 'images/bg1.jpg' },
        { title: 'Your Style, Your Way', description: 'Salon Services Designed for Everyone!', bg : 'images/bg4.jpg' },
        { title: 'Special Services', description: 'Make your moments unforgettable with us', bg: 'images/bg2.jpg' },
    ]; 

    getBackgroundImage(index: number): string {
        return this.slides[index].bg;
    }

    constructor(
        private clientService: ClientService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.clientService.getBestSellingProducts().subscribe((res: any) => {
            this.products = res.products;
        });
        this.intervalId = setInterval(() => {
            this.currentIndex.set((this.currentIndex() + 1) % this.slides.length);
        }, 4000);

        this.clientService.getTestimonials().subscribe(
            (res: any) => {
                this.testimonials = res.testimonials;
            });
    }

    ngAfterViewInit(): void {
        this.startAutoScroll();
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    startAutoScroll() {
        const container = this.scrollContainer.nativeElement;
        const scroll = () => {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollTo({ left: 0 });
            } else {
                container.scrollLeft += this.scrollSpeed;
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

    startService(serviceType: string) {
        if (this.authService.getLoggedIn()) {
            this.router.navigate(['/branch'], { queryParams: { serviceType: serviceType } });
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
