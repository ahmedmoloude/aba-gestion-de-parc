import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommerciauxComponent } from './detail-commerciaux.component';

describe('DetailCommerciauxComponent', () => {
  let component: DetailCommerciauxComponent;
  let fixture: ComponentFixture<DetailCommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
