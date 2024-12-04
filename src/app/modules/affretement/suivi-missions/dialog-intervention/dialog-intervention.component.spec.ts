import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInterventionComponent } from './dialog-intervention.component';

describe('DialogInterventionComponent', () => {
  let component: DialogInterventionComponent;
  let fixture: ComponentFixture<DialogInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
