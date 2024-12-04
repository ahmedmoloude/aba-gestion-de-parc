import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacturationSpecialOffersComponent } from './edit-facturation-special-offers.component';

describe('EditFacturationSpecialOffersComponent', () => {
  let component: EditFacturationSpecialOffersComponent;
  let fixture: ComponentFixture<EditFacturationSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacturationSpecialOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacturationSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
