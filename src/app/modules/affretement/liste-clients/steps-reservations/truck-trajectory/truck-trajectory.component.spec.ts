import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckTrajectoryComponent } from './truck-trajectory.component';

describe('TruckTrajectoryComponent', () => {
  let component: TruckTrajectoryComponent;
  let fixture: ComponentFixture<TruckTrajectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckTrajectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckTrajectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
