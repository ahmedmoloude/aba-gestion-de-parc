import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPiecesComponent } from './detail-pieces.component';

describe('DetailPiecesComponent', () => {
  let component: DetailPiecesComponent;
  let fixture: ComponentFixture<DetailPiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPiecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
