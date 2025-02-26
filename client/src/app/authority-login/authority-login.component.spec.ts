import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityLoginComponent } from './authority-login.component';

describe('AuthorityLoginComponent', () => {
  let component: AuthorityLoginComponent;
  let fixture: ComponentFixture<AuthorityLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorityLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorityLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
