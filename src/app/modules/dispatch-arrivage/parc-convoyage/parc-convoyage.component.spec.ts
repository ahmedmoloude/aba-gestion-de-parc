import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcConvoyageComponent } from './parc-convoyage.component';

describe('ParcConvoyageComponent', () => {
  let component: ParcConvoyageComponent;
  let fixture: ComponentFixture<ParcConvoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcConvoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcConvoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
