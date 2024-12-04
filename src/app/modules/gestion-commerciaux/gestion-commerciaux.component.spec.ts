import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommerciauxComponent } from './gestion-commerciaux.component';

describe('GestionCommerciauxComponent', () => {
  let component: GestionCommerciauxComponent;
  let fixture: ComponentFixture<GestionCommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
