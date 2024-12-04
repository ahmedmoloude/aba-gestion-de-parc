import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportConditionServiceComponent } from './transport-condition-service.component';

describe('TransportConditionServiceComponent', () => {
  let component: TransportConditionServiceComponent;
  let fixture: ComponentFixture<TransportConditionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportConditionServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportConditionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
