import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowValidationComponent } from './workflow-validation.component';

describe('WorkflowValidationComponent', () => {
  let component: WorkflowValidationComponent;
  let fixture: ComponentFixture<WorkflowValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
