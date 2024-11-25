import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreCategorieComponent } from './parametre-categorie.component';

describe('ParametreCategorieComponent', () => {
  let component: ParametreCategorieComponent;
  let fixture: ComponentFixture<ParametreCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
