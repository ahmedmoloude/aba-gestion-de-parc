import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConditionDialogComponent } from './affretment-condition-dialog.component';

describe('AffretmentConditionDialogComponent', () => {
  let component: AffretmentConditionDialogComponent;
  let fixture: ComponentFixture<AffretmentConditionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConditionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
