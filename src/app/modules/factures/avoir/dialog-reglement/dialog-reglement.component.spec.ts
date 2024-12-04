import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReglementComponent } from './dialog-reglement.component';

describe('DialogReglementComponent', () => {
  let component: DialogReglementComponent;
  let fixture: ComponentFixture<DialogReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
