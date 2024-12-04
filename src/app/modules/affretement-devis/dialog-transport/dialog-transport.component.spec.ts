import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransportComponent } from './dialog-transport.component';

describe('DialogTransportComponent', () => {
  let component: DialogTransportComponent;
  let fixture: ComponentFixture<DialogTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
