import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRemplacementComponent } from './detail-remplacement.component';

describe('DetailRemplacementComponent', () => {
  let component: DetailRemplacementComponent;
  let fixture: ComponentFixture<DetailRemplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRemplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRemplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
