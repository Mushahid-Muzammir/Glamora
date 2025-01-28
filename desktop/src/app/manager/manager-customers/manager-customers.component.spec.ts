import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCustomersComponent } from './manager-customers.component';

describe('ManagerCustomersComponent', () => {
  let component: ManagerCustomersComponent;
  let fixture: ComponentFixture<ManagerCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
