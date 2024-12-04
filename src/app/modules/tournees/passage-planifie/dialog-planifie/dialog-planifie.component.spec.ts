import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlanifieComponent } from './dialog-planifie.component';

describe('DialogPlanifieComponent', () => {
  let component: DialogPlanifieComponent;
  let fixture: ComponentFixture<DialogPlanifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlanifieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlanifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
