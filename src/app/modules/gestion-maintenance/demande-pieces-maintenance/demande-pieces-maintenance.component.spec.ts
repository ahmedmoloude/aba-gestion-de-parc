import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePiecesMaintenanceComponent } from './demande-pieces-maintenance.component';

describe('DemandePiecesMaintenanceComponent', () => {
  let component: DemandePiecesMaintenanceComponent;
  let fixture: ComponentFixture<DemandePiecesMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePiecesMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePiecesMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
