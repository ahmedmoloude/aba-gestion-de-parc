import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCarteComponent } from './historique-carte.component';

describe('HistoriqueCarteComponent', () => {
  let component: HistoriqueCarteComponent;
  let fixture: ComponentFixture<HistoriqueCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
