import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRetourComponent } from './validation-retour.component';

describe('ValidationRetourComponent', () => {
  let component: ValidationRetourComponent;
  let fixture: ComponentFixture<ValidationRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
