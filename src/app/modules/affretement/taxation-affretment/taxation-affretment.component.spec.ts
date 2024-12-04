import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationAffretmentComponent } from './taxation-affretment.component';

describe('TaxationAffretmentComponent', () => {
  let component: TaxationAffretmentComponent;
  let fixture: ComponentFixture<TaxationAffretmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxationAffretmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationAffretmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
