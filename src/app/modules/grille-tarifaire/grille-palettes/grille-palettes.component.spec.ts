import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillePalettesComponent } from './grille-palettes.component';

describe('GrillePalettesComponent', () => {
  let component: GrillePalettesComponent;
  let fixture: ComponentFixture<GrillePalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillePalettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillePalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
