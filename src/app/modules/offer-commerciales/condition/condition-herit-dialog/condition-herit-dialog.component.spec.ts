import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionHeritDialogComponent } from './condition-herit-dialog.component';

describe('ConditionHeritDialogComponent', () => {
  let component: ConditionHeritDialogComponent;
  let fixture: ComponentFixture<ConditionHeritDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionHeritDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionHeritDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
