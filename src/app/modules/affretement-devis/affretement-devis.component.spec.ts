import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretementDevisComponent } from './affretement-devis.component';

describe('AffretementDevisComponent', () => {
  let component: AffretementDevisComponent;
  let fixture: ComponentFixture<AffretementDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretementDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretementDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
