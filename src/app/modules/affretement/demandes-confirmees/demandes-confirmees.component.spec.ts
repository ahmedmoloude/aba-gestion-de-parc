import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesConfirmeesComponent } from './demandes-confirmees.component';

describe('DemandesConfirmeesComponent', () => {
  let component: DemandesConfirmeesComponent;
  let fixture: ComponentFixture<DemandesConfirmeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesConfirmeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesConfirmeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
