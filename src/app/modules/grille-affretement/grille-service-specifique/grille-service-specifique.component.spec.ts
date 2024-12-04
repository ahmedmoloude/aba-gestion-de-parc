import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleServiceSpecifiqueComponent } from './grille-service-specifique.component';

describe('GrilleServiceSpecifiqueComponent', () => {
  let component: GrilleServiceSpecifiqueComponent;
  let fixture: ComponentFixture<GrilleServiceSpecifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleServiceSpecifiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleServiceSpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
