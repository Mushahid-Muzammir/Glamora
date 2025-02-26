import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddEmployeeComponent } from './manager-add-employee.component';

describe('ManagerAddEmployeeComponent', () => {
  let component: ManagerAddEmployeeComponent;
  let fixture: ComponentFixture<ManagerAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAddEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
