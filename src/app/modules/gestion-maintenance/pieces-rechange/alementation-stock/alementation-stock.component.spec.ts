import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlementationStockComponent } from './alementation-stock.component';

describe('AlementationStockComponent', () => {
  let component: AlementationStockComponent;
  let fixture: ComponentFixture<AlementationStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlementationStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlementationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
