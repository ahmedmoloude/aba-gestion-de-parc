import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeRemplacementComponent } from './vehicule-remplacement.component';

describe('VehiculeRemplacementComponent', () => {
  let component: VehiculeRemplacementComponent;
  let fixture: ComponentFixture<VehiculeRemplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeRemplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeRemplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
