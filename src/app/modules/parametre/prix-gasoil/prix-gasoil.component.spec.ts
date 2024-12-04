import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixGasoilComponent } from './prix-gasoil.component';

describe('PrixGasoilComponent', () => {
  let component: PrixGasoilComponent;
  let fixture: ComponentFixture<PrixGasoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixGasoilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrixGasoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
