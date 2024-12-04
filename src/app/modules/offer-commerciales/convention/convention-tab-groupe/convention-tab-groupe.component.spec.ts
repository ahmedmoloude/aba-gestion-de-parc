import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionTabGroupeComponent } from './convention-tab-groupe.component';

describe('ConventionTabGroupeComponent', () => {
  let component: ConventionTabGroupeComponent;
  let fixture: ComponentFixture<ConventionTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
