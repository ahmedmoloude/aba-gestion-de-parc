import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreObjectifComponent } from './parametre-objectif.component';

describe('ParametreObjectifComponent', () => {
  let component: ParametreObjectifComponent;
  let fixture: ComponentFixture<ParametreObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreObjectifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
