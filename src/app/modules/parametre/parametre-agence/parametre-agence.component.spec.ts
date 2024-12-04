import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreAgenceComponent } from './parametre-agence.component';

describe('ParametreAgenceComponent', () => {
  let component: ParametreAgenceComponent;
  let fixture: ComponentFixture<ParametreAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
