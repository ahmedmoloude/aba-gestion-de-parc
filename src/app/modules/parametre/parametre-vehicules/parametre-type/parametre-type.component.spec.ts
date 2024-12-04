import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreTypeComponent } from './parametre-type.component';

describe('ParametreTypeComponent', () => {
  let component: ParametreTypeComponent;
  let fixture: ComponentFixture<ParametreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
