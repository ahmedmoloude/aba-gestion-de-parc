import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreTvaComponent } from './parametre-tva.component';

describe('ParametreTvaComponent', () => {
  let component: ParametreTvaComponent;
  let fixture: ComponentFixture<ParametreTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreTvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
