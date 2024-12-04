import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsnomsDialogComponent } from './horsnoms-dialog.component';

describe('HorsnomsDialogComponent', () => {
  let component: HorsnomsDialogComponent;
  let fixture: ComponentFixture<HorsnomsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorsnomsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsnomsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
