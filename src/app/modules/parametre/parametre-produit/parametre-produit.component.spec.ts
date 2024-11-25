import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreProduitComponent } from './parametre-produit.component';

describe('ParametreProduitComponent', () => {
  let component: ParametreProduitComponent;
  let fixture: ComponentFixture<ParametreProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
