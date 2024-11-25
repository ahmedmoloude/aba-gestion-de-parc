import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreAxeComponent } from './parametre-axe.component';

describe('ParametreAxeComponent', () => {
  let component: ParametreAxeComponent;
  let fixture: ComponentFixture<ParametreAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreAxeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
