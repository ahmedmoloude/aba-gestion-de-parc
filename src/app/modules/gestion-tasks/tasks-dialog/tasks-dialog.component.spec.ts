import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDialogComponent } from './tasks-dialog.component';

describe('TasksDialogComponent', () => {
  let component: TasksDialogComponent;
  let fixture: ComponentFixture<TasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
