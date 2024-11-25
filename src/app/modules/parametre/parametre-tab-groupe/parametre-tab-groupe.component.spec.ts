import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreTabGroupeComponent } from './parametre-tab-groupe.component';

describe('ParametreTabGroupeComponent', () => {
  let component: ParametreTabGroupeComponent;
  let fixture: ComponentFixture<ParametreTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
