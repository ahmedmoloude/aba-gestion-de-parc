import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargerCarteComponent } from './recharger-carte.component';

describe('RechargerCarteComponent', () => {
  let component: RechargerCarteComponent;
  let fixture: ComponentFixture<RechargerCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargerCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargerCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
