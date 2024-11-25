import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaireRechangeComponent } from './inventaire-rechange.component';

describe('InventaireRechangeComponent', () => {
  let component: InventaireRechangeComponent;
  let fixture: ComponentFixture<InventaireRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaireRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
