import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachygrapheComponent } from './tachygraphe.component';

describe('TachygrapheComponent', () => {
  let component: TachygrapheComponent;
  let fixture: ComponentFixture<TachygrapheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TachygrapheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TachygrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
