import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsReservationsComponent } from './steps-reservations.component';

describe('StepsReservationsComponent', () => {
  let component: StepsReservationsComponent;
  let fixture: ComponentFixture<StepsReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
