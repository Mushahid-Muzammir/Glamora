import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddServiceComponent } from './manager-add-service.component';

describe('ManagerAddServiceComponent', () => {
  let component: ManagerAddServiceComponent;
  let fixture: ComponentFixture<ManagerAddServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAddServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
