import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAffectationComponent } from './tab-affectation.component';

describe('TabAffectationComponent', () => {
  let component: TabAffectationComponent;
  let fixture: ComponentFixture<TabAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
