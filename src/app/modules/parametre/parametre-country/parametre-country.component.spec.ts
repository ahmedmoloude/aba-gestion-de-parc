import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreCountryComponent } from './parametre-country.component';

describe('ParametreCountryComponent', () => {
  let component: ParametreCountryComponent;
  let fixture: ComponentFixture<ParametreCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
