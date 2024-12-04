import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretementTabGroupeComponent } from './affretement-tab-groupe.component';

describe('AffretementTabGroupeComponent', () => {
  let component: AffretementTabGroupeComponent;
  let fixture: ComponentFixture<AffretementTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretementTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretementTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
