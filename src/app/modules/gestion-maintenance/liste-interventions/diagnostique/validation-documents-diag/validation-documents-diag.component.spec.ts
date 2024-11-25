import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDocumentsDiagComponent } from './validation-documents-diag.component';

describe('ValidationDocumentsDiagComponent', () => {
  let component: ValidationDocumentsDiagComponent;
  let fixture: ComponentFixture<ValidationDocumentsDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationDocumentsDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDocumentsDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
