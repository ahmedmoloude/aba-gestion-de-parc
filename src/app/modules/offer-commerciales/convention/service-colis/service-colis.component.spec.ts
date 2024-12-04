import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceColisComponent } from './service-colis.component';

describe('ServiceColisComponent', () => {
  let component: ServiceColisComponent;
  let fixture: ComponentFixture<ServiceColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceColisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
