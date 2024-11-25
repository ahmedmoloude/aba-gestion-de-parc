import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeReformeComponent } from './vehicule-reforme.component';

describe('VehiculeReformeComponent', () => {
  let component: VehiculeReformeComponent;
  let fixture: ComponentFixture<VehiculeReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeReformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
