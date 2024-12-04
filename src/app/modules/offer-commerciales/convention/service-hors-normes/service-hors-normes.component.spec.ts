import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHorsNormesComponent } from './service-hors-normes.component';

describe('ServiceHorsNormesComponent', () => {
  let component: ServiceHorsNormesComponent;
  let fixture: ComponentFixture<ServiceHorsNormesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHorsNormesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHorsNormesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
