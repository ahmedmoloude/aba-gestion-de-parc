import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportConditionServiceDialogComponent } from './transport-condition-service-dialog.component';

describe('TransportConditionServiceDialogComponent', () => {
  let component: TransportConditionServiceDialogComponent;
  let fixture: ComponentFixture<TransportConditionServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportConditionServiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportConditionServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
