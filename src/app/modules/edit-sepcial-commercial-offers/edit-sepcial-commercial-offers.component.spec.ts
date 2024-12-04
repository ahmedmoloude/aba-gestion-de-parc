import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSepcialCommercialOffersComponent } from './edit-sepcial-commercial-offers.component';

describe('EditSepcialCommercialOffersComponent', () => {
  let component: EditSepcialCommercialOffersComponent;
  let fixture: ComponentFixture<EditSepcialCommercialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSepcialCommercialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSepcialCommercialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
