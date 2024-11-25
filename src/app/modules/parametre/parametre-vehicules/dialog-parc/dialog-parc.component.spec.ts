import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParcComponent } from './dialog-parc.component';

describe('DialogParcComponent', () => {
  let component: DialogParcComponent;
  let fixture: ComponentFixture<DialogParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
