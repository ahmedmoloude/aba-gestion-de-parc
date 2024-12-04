import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailObjectifComponent } from './detail-objectif.component';

describe('DetailObjectifComponent', () => {
  let component: DetailObjectifComponent;
  let fixture: ComponentFixture<DetailObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailObjectifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
