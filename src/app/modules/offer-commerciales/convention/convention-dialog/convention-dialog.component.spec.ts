import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionDialogComponent } from './convention-dialog.component';

describe('ConventionDialogComponent', () => {
  let component: ConventionDialogComponent;
  let fixture: ComponentFixture<ConventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
