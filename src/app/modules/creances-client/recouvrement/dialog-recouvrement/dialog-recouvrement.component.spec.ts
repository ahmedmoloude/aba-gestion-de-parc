import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecouvrementComponent } from './dialog-recouvrement.component';

describe('DialogRecouvrementComponent', () => {
  let component: DialogRecouvrementComponent;
  let fixture: ComponentFixture<DialogRecouvrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecouvrementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecouvrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
