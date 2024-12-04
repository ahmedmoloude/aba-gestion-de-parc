import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenirComponent } from './intervenir.component';

describe('IntervenirComponent', () => {
  let component: IntervenirComponent;
  let fixture: ComponentFixture<IntervenirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervenirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
