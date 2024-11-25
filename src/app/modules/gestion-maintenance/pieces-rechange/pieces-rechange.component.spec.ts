import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesRechangeComponent } from './pieces-rechange.component';

describe('PiecesRechangeComponent', () => {
  let component: PiecesRechangeComponent;
  let fixture: ComponentFixture<PiecesRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecesRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
