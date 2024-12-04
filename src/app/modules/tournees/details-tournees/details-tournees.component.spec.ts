import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTourneesComponent } from './details-tournees.component';

describe('DetailsTourneesComponent', () => {
  let component: DetailsTourneesComponent;
  let fixture: ComponentFixture<DetailsTourneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTourneesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTourneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
