import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOccasionComponent } from './select-occasion.component';

describe('SelectOccasionComponent', () => {
  let component: SelectOccasionComponent;
  let fixture: ComponentFixture<SelectOccasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOccasionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
