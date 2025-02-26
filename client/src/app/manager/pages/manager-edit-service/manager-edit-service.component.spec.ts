import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditServiceComponent } from './manager-edit-service.component';

describe('ManagerEditServiceComponent', () => {
  let component: ManagerEditServiceComponent;
  let fixture: ComponentFixture<ManagerEditServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEditServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
