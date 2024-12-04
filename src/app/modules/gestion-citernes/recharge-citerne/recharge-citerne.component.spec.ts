import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCiterneComponent } from './recharge-citerne.component';

describe('RechargeCiterneComponent', () => {
  let component: RechargeCiterneComponent;
  let fixture: ComponentFixture<RechargeCiterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeCiterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeCiterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
