import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionImpayesComponent } from './gestion-impayes.component';

describe('GestionImpayesComponent', () => {
  let component: GestionImpayesComponent;
  let fixture: ComponentFixture<GestionImpayesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionImpayesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionImpayesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
