import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationSpecialOffersComponent } from './facturation-special-offers.component';

describe('FacturationSpecialOffersComponent', () => {
  let component: FacturationSpecialOffersComponent;
  let fixture: ComponentFixture<FacturationSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturationSpecialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturationSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
