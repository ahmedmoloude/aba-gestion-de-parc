import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialgLivraisonComponent } from './dialg-livraison.component';

describe('DialgLivraisonComponent', () => {
  let component: DialgLivraisonComponent;
  let fixture: ComponentFixture<DialgLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialgLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialgLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
