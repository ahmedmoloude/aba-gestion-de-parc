import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleServiceStandardComponent } from './grille-service-standard.component';

describe('GrilleServiceStandardComponent', () => {
  let component: GrilleServiceStandardComponent;
  let fixture: ComponentFixture<GrilleServiceStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleServiceStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleServiceStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
