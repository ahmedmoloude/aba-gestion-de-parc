import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffectationComponent } from './list-affectation.component';

describe('ListAffectationComponent', () => {
  let component: ListAffectationComponent;
  let fixture: ComponentFixture<ListAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
