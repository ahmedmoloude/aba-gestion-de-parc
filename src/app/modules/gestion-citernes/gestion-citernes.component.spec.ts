import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCiternesComponent } from './gestion-citernes.component';

describe('GestionCiternesComponent', () => {
  let component: GestionCiternesComponent;
  let fixture: ComponentFixture<GestionCiternesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCiternesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCiternesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
