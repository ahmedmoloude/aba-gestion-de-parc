import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviMissionsComponent } from './suivi-missions.component';

describe('SuiviMissionsComponent', () => {
  let component: SuiviMissionsComponent;
  let fixture: ComponentFixture<SuiviMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
