import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeExtincteurComponent } from './recharge-extincteur.component';

describe('RechargeExtincteurComponent', () => {
  let component: RechargeExtincteurComponent;
  let fixture: ComponentFixture<RechargeExtincteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeExtincteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeExtincteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
