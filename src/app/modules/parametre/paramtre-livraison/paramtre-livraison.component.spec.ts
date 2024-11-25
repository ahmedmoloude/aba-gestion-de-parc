import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamtreLivraisonComponent } from './paramtre-livraison.component';

describe('ParamtreLivraisonComponent', () => {
  let component: ParamtreLivraisonComponent;
  let fixture: ComponentFixture<ParamtreLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamtreLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamtreLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
