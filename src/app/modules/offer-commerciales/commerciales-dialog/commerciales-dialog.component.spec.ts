import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialesDialogComponent } from './commerciales-dialog.component';

describe('CommercialesDialogComponent', () => {
  let component: CommercialesDialogComponent;
  let fixture: ComponentFixture<CommercialesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
