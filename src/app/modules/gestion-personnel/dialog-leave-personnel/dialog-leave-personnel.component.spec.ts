import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeavePersonnelComponent } from './dialog-leave-personnel.component';

describe('DialogLeavePersonnelComponent', () => {
  let component: DialogLeavePersonnelComponent;
  let fixture: ComponentFixture<DialogLeavePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLeavePersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeavePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
