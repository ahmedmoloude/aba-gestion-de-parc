import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreerObjectifComponent } from './dialog-creer-objectif.component';

describe('DialogCreerObjectifComponent', () => {
  let component: DialogCreerObjectifComponent;
  let fixture: ComponentFixture<DialogCreerObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreerObjectifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreerObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
