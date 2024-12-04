import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcTransitComponent } from './parc-transit.component';

describe('ParcTransitComponent', () => {
  let component: ParcTransitComponent;
  let fixture: ComponentFixture<ParcTransitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcTransitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
