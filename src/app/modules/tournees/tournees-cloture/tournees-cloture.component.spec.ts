import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneesClotureComponent } from './tournees-cloture.component';

describe('TourneesClotureComponent', () => {
  let component: TourneesClotureComponent;
  let fixture: ComponentFixture<TourneesClotureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourneesClotureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourneesClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
