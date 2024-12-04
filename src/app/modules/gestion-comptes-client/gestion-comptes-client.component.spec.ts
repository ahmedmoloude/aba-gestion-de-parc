import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComptesClientComponent } from './gestion-comptes-client.component';

describe('GestionComptesClientComponent', () => {
  let component: GestionComptesClientComponent;
  let fixture: ComponentFixture<GestionComptesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionComptesClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComptesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
