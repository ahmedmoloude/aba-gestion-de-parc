import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVehiculeDialogComponent } from './import-vehicule-dialog.component';

describe('ImportVehiculeDialogComponent', () => {
  let component: ImportVehiculeDialogComponent;
  let fixture: ComponentFixture<ImportVehiculeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportVehiculeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVehiculeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
