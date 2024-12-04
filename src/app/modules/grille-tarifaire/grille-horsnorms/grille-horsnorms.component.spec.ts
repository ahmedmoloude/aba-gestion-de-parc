import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleHorsnormsComponent } from './grille-horsnorms.component';

describe('GrilleHorsnormsComponent', () => {
  let component: GrilleHorsnormsComponent;
  let fixture: ComponentFixture<GrilleHorsnormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleHorsnormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleHorsnormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
