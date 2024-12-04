import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcTabGroupeComponent } from './parc-tab-groupe.component';

describe('ParcTabGroupeComponent', () => {
  let component: ParcTabGroupeComponent;
  let fixture: ComponentFixture<ParcTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
