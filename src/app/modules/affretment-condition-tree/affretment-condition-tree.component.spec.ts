import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConditionTreeComponent } from './affretment-condition-tree.component';

describe('AffretmentConditionTreeComponent', () => {
  let component: AffretmentConditionTreeComponent;
  let fixture: ComponentFixture<AffretmentConditionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConditionTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConditionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
