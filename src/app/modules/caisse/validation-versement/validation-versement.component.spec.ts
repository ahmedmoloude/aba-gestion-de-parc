import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationVersementComponent } from './validation-versement.component';

describe('ValidationVersementComponent', () => {
  let component: ValidationVersementComponent;
  let fixture: ComponentFixture<ValidationVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
