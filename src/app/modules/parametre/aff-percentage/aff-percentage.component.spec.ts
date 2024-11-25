import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffPercentageComponent } from './aff-percentage.component';

describe('AffPercentageComponent', () => {
  let component: AffPercentageComponent;
  let fixture: ComponentFixture<AffPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
