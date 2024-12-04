import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaireTabGroupeComponent } from './tarifaire-tab-groupe.component';

describe('TarifaireTabGroupeComponent', () => {
  let component: TarifaireTabGroupeComponent;
  let fixture: ComponentFixture<TarifaireTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifaireTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaireTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
