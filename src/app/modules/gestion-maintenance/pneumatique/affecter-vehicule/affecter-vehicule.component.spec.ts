import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterVehiculeComponent } from './affecter-vehicule.component';

describe('AffecterVehiculeComponent', () => {
  let component: AffecterVehiculeComponent;
  let fixture: ComponentFixture<AffecterVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
