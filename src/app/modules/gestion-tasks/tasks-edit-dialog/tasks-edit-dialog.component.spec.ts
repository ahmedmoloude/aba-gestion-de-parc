import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEditDialogComponent } from './tasks-edit-dialog.component';

describe('TasksEditDialogComponent', () => {
  let component: TasksEditDialogComponent;
  let fixture: ComponentFixture<TasksEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
