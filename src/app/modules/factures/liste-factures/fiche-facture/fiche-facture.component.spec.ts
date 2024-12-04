import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheFactureComponent } from './fiche-facture.component';

describe('FicheFactureComponent', () => {
  let component: FicheFactureComponent;
  let fixture: ComponentFixture<FicheFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
