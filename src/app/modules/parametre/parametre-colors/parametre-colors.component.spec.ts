import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreColorsComponent } from './parametre-colors.component';

describe('ParametreColorsComponent', () => {
  let component: ParametreColorsComponent;
  let fixture: ComponentFixture<ParametreColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
