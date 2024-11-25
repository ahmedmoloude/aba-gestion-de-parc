import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAffectationComponent } from './dialog-affectation.component';

describe('DialogAffectationComponent', () => {
  let component: DialogAffectationComponent;
  let fixture: ComponentFixture<DialogAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
