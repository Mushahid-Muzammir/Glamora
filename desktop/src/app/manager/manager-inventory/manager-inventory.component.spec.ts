import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerInventoryComponent } from './manager-inventory.component';

describe('ManagerInventoryComponent', () => {
  let component: ManagerInventoryComponent;
  let fixture: ComponentFixture<ManagerInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
