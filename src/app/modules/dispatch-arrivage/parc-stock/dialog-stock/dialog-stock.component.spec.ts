import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStockComponent } from './dialog-stock.component';

describe('DialogStockComponent', () => {
  let component: DialogStockComponent;
  let fixture: ComponentFixture<DialogStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
