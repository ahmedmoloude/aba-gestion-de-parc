import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcLivraisonComponent } from './parc-livraison.component';

describe('ParcLivraisonComponent', () => {
  let component: ParcLivraisonComponent;
  let fixture: ComponentFixture<ParcLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
