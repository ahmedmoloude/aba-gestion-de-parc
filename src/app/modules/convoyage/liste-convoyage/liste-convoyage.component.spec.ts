import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConvoyageComponent } from './liste-convoyage.component';

describe('ListeConvoyageComponent', () => {
  let component: ListeConvoyageComponent;
  let fixture: ComponentFixture<ListeConvoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConvoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConvoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
