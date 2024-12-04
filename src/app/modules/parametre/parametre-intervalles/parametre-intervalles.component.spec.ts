import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreIntervallesComponent } from './parametre-intervalles.component';

describe('ParametreIntervallesComponent', () => {
  let component: ParametreIntervallesComponent;
  let fixture: ComponentFixture<ParametreIntervallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreIntervallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreIntervallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
