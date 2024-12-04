import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreCommercialComponent } from './offre-commercial.component';

describe('OffreCommercialComponent', () => {
  let component: OffreCommercialComponent;
  let fixture: ComponentFixture<OffreCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
