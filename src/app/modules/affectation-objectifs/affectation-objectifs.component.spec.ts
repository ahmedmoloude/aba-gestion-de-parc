import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationObjectifsComponent } from './affectation-objectifs.component';

describe('AffectationObjectifsComponent', () => {
  let component: AffectationObjectifsComponent;
  let fixture: ComponentFixture<AffectationObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationObjectifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
