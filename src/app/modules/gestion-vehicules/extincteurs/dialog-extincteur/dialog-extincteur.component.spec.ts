import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExtincteurComponent } from './dialog-extincteur.component';

describe('DialogExtincteurComponent', () => {
  let component: DialogExtincteurComponent;
  let fixture: ComponentFixture<DialogExtincteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExtincteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExtincteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
