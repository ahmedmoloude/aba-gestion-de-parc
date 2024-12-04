import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentConventionServiceComponent } from './affretment-convention-service.component';

describe('AffretmentConventionServiceComponent', () => {
  let component: AffretmentConventionServiceComponent;
  let fixture: ComponentFixture<AffretmentConventionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentConventionServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentConventionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
