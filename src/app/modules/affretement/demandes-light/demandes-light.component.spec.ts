import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesLightComponent } from './demandes-light.component';

describe('DemandesLightComponent', () => {
  let component: DemandesLightComponent;
  let fixture: ComponentFixture<DemandesLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
