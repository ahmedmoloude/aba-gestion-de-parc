import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretementComponent } from './affretement.component';

describe('AffretementComponent', () => {
  let component: AffretementComponent;
  let fixture: ComponentFixture<AffretementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
