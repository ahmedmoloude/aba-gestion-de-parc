import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAvoirComponent } from './dialog-avoir.component';

describe('DialogAvoirComponent', () => {
  let component: DialogAvoirComponent;
  let fixture: ComponentFixture<DialogAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAvoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
