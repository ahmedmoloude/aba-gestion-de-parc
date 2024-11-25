import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrePrestataireComponent } from './parametre-prestataire.component';

describe('ParametrePrestataireComponent', () => {
  let component: ParametrePrestataireComponent;
  let fixture: ComponentFixture<ParametrePrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrePrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrePrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
