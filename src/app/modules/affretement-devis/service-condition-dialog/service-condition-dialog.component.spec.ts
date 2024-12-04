import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConditionDialogComponent } from './service-condition-dialog.component';

describe('ServiceConditionDialogComponent', () => {
  let component: ServiceConditionDialogComponent;
  let fixture: ComponentFixture<ServiceConditionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceConditionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
