import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpNonFactureComponent } from './exp-non-facture.component';

describe('ExpNonFactureComponent', () => {
  let component: ExpNonFactureComponent;
  let fixture: ComponentFixture<ExpNonFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpNonFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpNonFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
