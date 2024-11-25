import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecteDialogComponent } from './affecte-dialog.component';

describe('AffecteDialogComponent', () => {
  let component: AffecteDialogComponent;
  let fixture: ComponentFixture<AffecteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
