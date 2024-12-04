import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoyageComponent } from './convoyage.component';

describe('ConvoyageComponent', () => {
  let component: ConvoyageComponent;
  let fixture: ComponentFixture<ConvoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
