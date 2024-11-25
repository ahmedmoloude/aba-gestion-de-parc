import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomationCarburantComponent } from './consomation-carburant.component';

describe('ConsomationCarburantComponent', () => {
  let component: ConsomationCarburantComponent;
  let fixture: ComponentFixture<ConsomationCarburantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsomationCarburantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomationCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
