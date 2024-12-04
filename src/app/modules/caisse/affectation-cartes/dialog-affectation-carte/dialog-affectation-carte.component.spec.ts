import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAffectationCarteComponent } from './dialog-affectation-carte.component';

describe('DialogAffectationCarteComponent', () => {
  let component: DialogAffectationCarteComponent;
  let fixture: ComponentFixture<DialogAffectationCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAffectationCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAffectationCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
