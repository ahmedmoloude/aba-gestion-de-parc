import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementStocksComponent } from './mouvement-stocks.component';

describe('MouvementStocksComponent', () => {
  let component: MouvementStocksComponent;
  let fixture: ComponentFixture<MouvementStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouvementStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
