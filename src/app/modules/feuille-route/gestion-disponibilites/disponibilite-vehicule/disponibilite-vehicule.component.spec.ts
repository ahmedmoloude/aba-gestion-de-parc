import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteVehiculeComponent } from './disponibilite-vehicule.component';

describe('DisponibiliteVehiculeComponent', () => {
  let component: DisponibiliteVehiculeComponent;
  let fixture: ComponentFixture<DisponibiliteVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibiliteVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibiliteVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
