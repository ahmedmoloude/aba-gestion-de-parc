import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConditionServiceDialogComponent } from './affretment-condition-service-dialog.component';

describe('AffretmentConditionServiceDialogComponent', () => {
  let component: AffretmentConditionServiceDialogComponent;
  let fixture: ComponentFixture<AffretmentConditionServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConditionServiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConditionServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
