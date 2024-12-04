import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAffectationAgenceComponent } from './dialog-affectation-agence.component';

describe('DialogAffectationAgenceComponent', () => {
  let component: DialogAffectationAgenceComponent;
  let fixture: ComponentFixture<DialogAffectationAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAffectationAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAffectationAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
