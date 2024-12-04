import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTypeComponent } from './dialog-type.component';

describe('DialogTypeComponent', () => {
  let component: DialogTypeComponent;
  let fixture: ComponentFixture<DialogTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
