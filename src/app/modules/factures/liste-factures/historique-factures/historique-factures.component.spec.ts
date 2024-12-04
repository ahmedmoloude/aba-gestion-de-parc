import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueFacturesComponent } from './historique-factures.component';

describe('HistoriqueFacturesComponent', () => {
  let component: HistoriqueFacturesComponent;
  let fixture: ComponentFixture<HistoriqueFacturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueFacturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
