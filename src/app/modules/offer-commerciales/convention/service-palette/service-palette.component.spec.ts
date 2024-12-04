import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePaletteComponent } from './service-palette.component';

describe('ServicePaletteComponent', () => {
  let component: ServicePaletteComponent;
  let fixture: ComponentFixture<ServicePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});