import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditProductComponent } from './manager-edit-product.component';

describe('ManagerEditProductComponent', () => {
  let component: ManagerEditProductComponent;
  let fixture: ComponentFixture<ManagerEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
