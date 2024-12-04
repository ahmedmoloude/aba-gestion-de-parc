import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAffretementComponent } from './details-affretement.component';

describe('DetailsAffretementComponent', () => {
  let component: DetailsAffretementComponent;
  let fixture: ComponentFixture<DetailsAffretementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAffretementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAffretementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
