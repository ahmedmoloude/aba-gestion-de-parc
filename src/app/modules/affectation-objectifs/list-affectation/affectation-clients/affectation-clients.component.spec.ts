import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationClientsComponent } from './affectation-clients.component';

describe('AffectationClientsComponent', () => {
  let component: AffectationClientsComponent;
  let fixture: ComponentFixture<AffectationClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
