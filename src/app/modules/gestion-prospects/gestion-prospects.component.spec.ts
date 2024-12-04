import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProspectsComponent } from './gestion-prospects.component';

describe('GestionProspectsComponent', () => {
  let component: GestionProspectsComponent;
  let fixture: ComponentFixture<GestionProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
