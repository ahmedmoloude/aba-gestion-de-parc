import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensesAutorouteComponent } from './depenses-autoroute.component';

describe('DepensesAutorouteComponent', () => {
  let component: DepensesAutorouteComponent;
  let fixture: ComponentFixture<DepensesAutorouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensesAutorouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepensesAutorouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
