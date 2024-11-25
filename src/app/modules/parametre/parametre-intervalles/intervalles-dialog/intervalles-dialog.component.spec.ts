import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervallesDialogComponent } from './intervalles-dialog.component';

describe('IntervallesDialogComponent', () => {
  let component: IntervallesDialogComponent;
  let fixture: ComponentFixture<IntervallesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervallesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervallesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
