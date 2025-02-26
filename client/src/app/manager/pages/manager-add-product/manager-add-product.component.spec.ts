import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddProductComponent } from './manager-add-product.component';

describe('ManagerAddProductComponent', () => {
  let component: ManagerAddProductComponent;
  let fixture: ComponentFixture<ManagerAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAddProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
