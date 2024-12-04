import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentadminGroupeComponent } from './documentadmin-groupe.component';

describe('DocumentadminGroupeComponent', () => {
  let component: DocumentadminGroupeComponent;
  let fixture: ComponentFixture<DocumentadminGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentadminGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentadminGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
