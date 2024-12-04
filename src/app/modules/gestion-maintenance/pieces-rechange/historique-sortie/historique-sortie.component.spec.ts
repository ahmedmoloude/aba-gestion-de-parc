import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueSortieComponent } from './historique-sortie.component';

describe('HistoriqueSortieComponent', () => {
  let component: HistoriqueSortieComponent;
  let fixture: ComponentFixture<HistoriqueSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
