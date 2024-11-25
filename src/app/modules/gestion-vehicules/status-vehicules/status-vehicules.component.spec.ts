import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusVehiculesComponent } from './status-vehicules.component';

describe('StatusVehiculesComponent', () => {
  let component: StatusVehiculesComponent;
  let fixture: ComponentFixture<StatusVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusVehiculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
