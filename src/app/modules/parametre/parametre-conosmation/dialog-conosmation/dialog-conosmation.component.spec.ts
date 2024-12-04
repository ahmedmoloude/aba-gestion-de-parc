import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConosmationComponent } from './dialog-conosmation.component';

describe('DialogConosmationComponent', () => {
  let component: DialogConosmationComponent;
  let fixture: ComponentFixture<DialogConosmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConosmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConosmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
