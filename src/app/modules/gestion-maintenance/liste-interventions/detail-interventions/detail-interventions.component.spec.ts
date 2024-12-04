import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInterventionsComponent } from './detail-interventions.component';

describe('DetailInterventionsComponent', () => {
  let component: DetailInterventionsComponent;
  let fixture: ComponentFixture<DetailInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailInterventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
