import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationCommercialComponent } from './affectation-commercial.component';

describe('AffectationCommercialComponent', () => {
  let component: AffectationCommercialComponent;
  let fixture: ComponentFixture<AffectationCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
