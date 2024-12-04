import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeTabGroupeComponent } from './vehicule-tab-groupe.component';

describe('VehiculeTabGroupeComponent', () => {
  let component: VehiculeTabGroupeComponent;
  let fixture: ComponentFixture<VehiculeTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
