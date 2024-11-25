import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteConducteurComponent } from './disponibilite-conducteur.component';

describe('DisponibiliteConducteurComponent', () => {
  let component: DisponibiliteConducteurComponent;
  let fixture: ComponentFixture<DisponibiliteConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibiliteConducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibiliteConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
