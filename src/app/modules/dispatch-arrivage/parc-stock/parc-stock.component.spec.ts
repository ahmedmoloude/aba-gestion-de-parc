import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcStockComponent } from './parc-stock.component';

describe('ParcStockComponent', () => {
  let component: ParcStockComponent;
  let fixture: ComponentFixture<ParcStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
