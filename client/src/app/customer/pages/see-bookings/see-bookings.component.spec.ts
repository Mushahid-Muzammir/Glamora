import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeBookingsComponent } from './see-bookings.component';

describe('SeeBookingsComponent', () => {
  let component: SeeBookingsComponent;
  let fixture: ComponentFixture<SeeBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
