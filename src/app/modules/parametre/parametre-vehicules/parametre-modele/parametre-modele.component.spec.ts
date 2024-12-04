import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreModeleComponent } from './parametre-modele.component';

describe('ParametreModeleComponent', () => {
  let component: ParametreModeleComponent;
  let fixture: ComponentFixture<ParametreModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
