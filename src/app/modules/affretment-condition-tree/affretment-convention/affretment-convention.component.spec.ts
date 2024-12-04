import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConventionComponent } from './affretment-convention.component';

describe('AffretmentConventionComponent', () => {
  let component: AffretmentConventionComponent;
  let fixture: ComponentFixture<AffretmentConventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
