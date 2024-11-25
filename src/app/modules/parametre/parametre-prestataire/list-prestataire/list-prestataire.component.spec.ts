import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrestataireComponent } from './list-prestataire.component';

describe('ListPrestataireComponent', () => {
  let component: ListPrestataireComponent;
  let fixture: ComponentFixture<ListPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
