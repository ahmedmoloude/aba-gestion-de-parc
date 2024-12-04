import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConditionServiceComponent } from './affretment-condition-service.component';

describe('AffretmentConditionServiceComponent', () => {
  let component: AffretmentConditionServiceComponent;
  let fixture: ComponentFixture<AffretmentConditionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConditionServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConditionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
