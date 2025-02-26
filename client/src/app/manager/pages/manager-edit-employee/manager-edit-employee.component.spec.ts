import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditEmployeeComponent } from './manager-edit-employee.component';

describe('ManagerEditEmployeeComponent', () => {
  let component: ManagerEditEmployeeComponent;
  let fixture: ComponentFixture<ManagerEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEditEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
