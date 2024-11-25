import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueExtincteurComponent } from './historique-extincteur.component';

describe('HistoriqueExtincteurComponent', () => {
  let component: HistoriqueExtincteurComponent;
  let fixture: ComponentFixture<HistoriqueExtincteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueExtincteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueExtincteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
