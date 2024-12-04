import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreServicesComponent } from './parametre-services.component';

describe('ParametreServicesComponent', () => {
  let component: ParametreServicesComponent;
  let fixture: ComponentFixture<ParametreServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
