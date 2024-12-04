import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPiecejointeComponent } from './dialog-piecejointe.component';

describe('DialogPiecejointeComponent', () => {
  let component: DialogPiecejointeComponent;
  let fixture: ComponentFixture<DialogPiecejointeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPiecejointeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPiecejointeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
