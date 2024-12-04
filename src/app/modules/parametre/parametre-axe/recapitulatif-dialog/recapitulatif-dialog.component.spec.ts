import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapitulatifDialogComponent } from './recapitulatif-dialog.component';

describe('RecapitulatifDialogComponent', () => {
  let component: RecapitulatifDialogComponent;
  let fixture: ComponentFixture<RecapitulatifDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapitulatifDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapitulatifDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
