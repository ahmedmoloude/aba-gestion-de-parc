import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatControleComponent } from './etat-controle.component';

describe('EtatControleComponent', () => {
  let component: EtatControleComponent;
  let fixture: ComponentFixture<EtatControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatControleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
