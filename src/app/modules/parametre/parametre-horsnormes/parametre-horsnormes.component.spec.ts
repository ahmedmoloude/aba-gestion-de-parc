import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreHorsnormesComponent } from './parametre-horsnormes.component';

describe('ParametreHorsnormesComponent', () => {
  let component: ParametreHorsnormesComponent;
  let fixture: ComponentFixture<ParametreHorsnormesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreHorsnormesComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreHorsnormesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
