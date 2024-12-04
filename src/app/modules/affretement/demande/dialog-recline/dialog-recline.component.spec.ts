import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReclineComponent } from './dialog-recline.component';

describe('DialogReclineComponent', () => {
  let component: DialogReclineComponent;
  let fixture: ComponentFixture<DialogReclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
