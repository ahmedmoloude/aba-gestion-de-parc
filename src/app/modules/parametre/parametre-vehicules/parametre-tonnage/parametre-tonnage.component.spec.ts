import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreTonnageComponent } from './parametre-tonnage.component';

describe('ParametreTonnageComponent', () => {
  let component: ParametreTonnageComponent;
  let fixture: ComponentFixture<ParametreTonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreTonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreTonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
