import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrestataireComponent } from './add-prestataire.component';

describe('AddPrestataireComponent', () => {
  let component: AddPrestataireComponent;
  let fixture: ComponentFixture<AddPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
