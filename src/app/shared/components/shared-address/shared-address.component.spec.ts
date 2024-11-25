import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAddressComponent } from './shared-address.component';

describe('SharedAddressComponent', () => {
  let component: SharedAddressComponent;
  let fixture: ComponentFixture<SharedAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
