import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRdvsComponent } from './gestion-rdvs.component';

describe('GestionRdvsComponent', () => {
  let component: GestionRdvsComponent;
  let fixture: ComponentFixture<GestionRdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRdvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
