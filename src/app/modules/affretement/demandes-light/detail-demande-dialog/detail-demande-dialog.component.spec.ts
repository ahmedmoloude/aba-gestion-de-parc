import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeDialogComponent } from './detail-demande-dialog.component';

describe('DetailDemandeDialogComponent', () => {
  let component: DetailDemandeDialogComponent;
  let fixture: ComponentFixture<DetailDemandeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDemandeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
