import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitationComponent } from './habilitation.component';

describe('HabilitationComponent', () => {
  let component: HabilitationComponent;
  let fixture: ComponentFixture<HabilitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
