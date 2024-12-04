import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReferenceChequeComponent } from './dialog-reference-cheque.component';

describe('DialogReferenceChequeComponent', () => {
  let component: DialogReferenceChequeComponent;
  let fixture: ComponentFixture<DialogReferenceChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReferenceChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReferenceChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
