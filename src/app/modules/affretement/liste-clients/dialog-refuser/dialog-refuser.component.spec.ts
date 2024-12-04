import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRefuserComponent } from './dialog-refuser.component';

describe('DialogRefuserComponent', () => {
  let component: DialogRefuserComponent;
  let fixture: ComponentFixture<DialogRefuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRefuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRefuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
