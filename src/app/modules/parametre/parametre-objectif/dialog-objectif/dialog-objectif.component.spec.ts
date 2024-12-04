import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogObjectifComponent } from './dialog-objectif.component';

describe('DialogObjectifComponent', () => {
  let component: DialogObjectifComponent;
  let fixture: ComponentFixture<DialogObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogObjectifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
