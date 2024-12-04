import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolygonDialogComponent } from './add-polygon-dialog.component';

describe('AddPolygonDialogComponent', () => {
  let component: AddPolygonDialogComponent;
  let fixture: ComponentFixture<AddPolygonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPolygonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPolygonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
