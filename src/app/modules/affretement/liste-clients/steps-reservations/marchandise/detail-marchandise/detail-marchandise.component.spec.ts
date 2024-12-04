import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMarchandiseComponent } from './detail-marchandise.component';

describe('DetailMarchandiseComponent', () => {
  let component: DetailMarchandiseComponent;
  let fixture: ComponentFixture<DetailMarchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMarchandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMarchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
