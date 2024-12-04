import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisDialogComponent } from './devis-dialog.component';

describe('DevisDialogComponent', () => {
  let component: DevisDialogComponent;
  let fixture: ComponentFixture<DevisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
