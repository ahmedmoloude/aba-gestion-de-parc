import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDialogComponent } from './fiche-dialog.component';

describe('FicheDialogComponent', () => {
  let component: FicheDialogComponent;
  let fixture: ComponentFixture<FicheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
