import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmployeeServiceComponent } from './select-employee-service.component';

describe('SelectEmployeeServiceComponent', () => {
  let component: SelectEmployeeServiceComponent;
  let fixture: ComponentFixture<SelectEmployeeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEmployeeServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmployeeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
