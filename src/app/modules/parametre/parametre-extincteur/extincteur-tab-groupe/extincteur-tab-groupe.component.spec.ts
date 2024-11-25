import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtincteurTabGroupeComponent } from './extincteur-tab-groupe.component';

describe('ExtincteurTabGroupeComponent', () => {
  let component: ExtincteurTabGroupeComponent;
  let fixture: ComponentFixture<ExtincteurTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtincteurTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtincteurTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
