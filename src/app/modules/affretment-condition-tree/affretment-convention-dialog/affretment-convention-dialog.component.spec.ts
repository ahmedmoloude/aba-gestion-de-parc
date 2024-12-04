import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConventionDialogComponent } from './affretment-convention-dialog.component';

describe('AffretmentConventionDialogComponent', () => {
  let component: AffretmentConventionDialogComponent;
  let fixture: ComponentFixture<AffretmentConventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConventionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
