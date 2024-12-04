import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChargementComponent } from './select-chargement.component';

describe('SelectChargementComponent', () => {
  let component: SelectChargementComponent;
  let fixture: ComponentFixture<SelectChargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectChargementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
