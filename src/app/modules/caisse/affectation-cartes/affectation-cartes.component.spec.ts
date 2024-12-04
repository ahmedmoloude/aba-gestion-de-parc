import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationCartesComponent } from './affectation-cartes.component';

describe('AffectationCartesComponent', () => {
  let component: AffectationCartesComponent;
  let fixture: ComponentFixture<AffectationCartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationCartesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationCartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
