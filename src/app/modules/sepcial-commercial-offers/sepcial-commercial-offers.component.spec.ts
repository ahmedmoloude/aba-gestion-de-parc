import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepcialCommercialOffersComponent } from './sepcial-commercial-offers.component';

describe('SepcialCommercialOffersComponent', () => {
  let component: SepcialCommercialOffersComponent;
  let fixture: ComponentFixture<SepcialCommercialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepcialCommercialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepcialCommercialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
