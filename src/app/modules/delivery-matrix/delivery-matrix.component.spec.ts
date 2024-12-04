import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMatrixComponent } from './delivery-matrix.component';

describe('DeliveryMatrixComponent', () => {
  let component: DeliveryMatrixComponent;
  let fixture: ComponentFixture<DeliveryMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
