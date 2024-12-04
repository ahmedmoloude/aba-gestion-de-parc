import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransitComponent } from './dialog-transit.component';

describe('DialogTransitComponent', () => {
  let component: DialogTransitComponent;
  let fixture: ComponentFixture<DialogTransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
