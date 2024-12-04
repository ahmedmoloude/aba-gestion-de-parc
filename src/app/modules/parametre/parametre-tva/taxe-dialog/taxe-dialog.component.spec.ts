import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeDialogComponent } from './taxe-dialog.component';

describe('TaxeDialogComponent', () => {
  let component: TaxeDialogComponent;
  let fixture: ComponentFixture<TaxeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
