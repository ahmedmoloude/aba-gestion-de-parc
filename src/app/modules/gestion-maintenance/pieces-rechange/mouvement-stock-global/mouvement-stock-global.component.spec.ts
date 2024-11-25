import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementStockGlobalComponent } from './mouvement-stock-global.component';

describe('MouvementStockGlobalComponent', () => {
  let component: MouvementStockGlobalComponent;
  let fixture: ComponentFixture<MouvementStockGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouvementStockGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementStockGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
