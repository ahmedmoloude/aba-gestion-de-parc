import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPneumatiqueComponent } from './detail-pneumatique.component';

describe('DetailPneumatiqueComponent', () => {
  let component: DetailPneumatiqueComponent;
  let fixture: ComponentFixture<DetailPneumatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPneumatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPneumatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
