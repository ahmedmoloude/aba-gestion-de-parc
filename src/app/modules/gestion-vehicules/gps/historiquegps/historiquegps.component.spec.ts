import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquegpsComponent } from './historiquegps.component';

describe('HistoriquegpsComponent', () => {
  let component: HistoriquegpsComponent;
  let fixture: ComponentFixture<HistoriquegpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquegpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquegpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
