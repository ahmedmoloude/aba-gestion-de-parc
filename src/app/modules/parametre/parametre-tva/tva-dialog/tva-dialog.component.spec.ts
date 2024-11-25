import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaDialogComponent } from './tva-dialog.component';

describe('TvaDialogComponent', () => {
  let component: TvaDialogComponent;
  let fixture: ComponentFixture<TvaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
