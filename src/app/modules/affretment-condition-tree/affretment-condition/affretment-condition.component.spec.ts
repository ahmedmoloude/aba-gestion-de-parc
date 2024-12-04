import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConditionComponent } from './affretment-condition.component';

describe('AffretmentConditionComponent', () => {
  let component: AffretmentConditionComponent;
  let fixture: ComponentFixture<AffretmentConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
