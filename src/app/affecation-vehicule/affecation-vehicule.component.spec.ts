import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecationVehiculeComponent } from './affecation-vehicule.component';

describe('AffecationVehiculeComponent', () => {
  let component: AffecationVehiculeComponent;
  let fixture: ComponentFixture<AffecationVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecationVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
