import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueVersionsComponent } from './historique-versions.component';

describe('HistoriqueVersionsComponent', () => {
  let component: HistoriqueVersionsComponent;
  let fixture: ComponentFixture<HistoriqueVersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueVersionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
