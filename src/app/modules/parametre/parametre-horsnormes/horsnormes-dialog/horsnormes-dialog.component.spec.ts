import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsnormesDialogComponent } from './horsnormes-dialog.component';

describe('HorsnormesDialogComponent', () => {
  let component: HorsnormesDialogComponent;
  let fixture: ComponentFixture<HorsnormesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorsnormesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsnormesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
