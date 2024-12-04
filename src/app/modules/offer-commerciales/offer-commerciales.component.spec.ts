import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCommercialesComponent } from './offer-commerciales.component';

describe('OfferCommercialesComponent', () => {
  let component: OfferCommercialesComponent;
  let fixture: ComponentFixture<OfferCommercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCommercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCommercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
