import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagePlanifieComponent } from './passage-planifie.component';

describe('PassagePlanifieComponent', () => {
  let component: PassagePlanifieComponent;
  let fixture: ComponentFixture<PassagePlanifieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassagePlanifieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassagePlanifieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
