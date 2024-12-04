import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueEpiComponent } from './historique-epi.component';

describe('HistoriqueEpiComponent', () => {
  let component: HistoriqueEpiComponent;
  let fixture: ComponentFixture<HistoriqueEpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueEpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueEpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
