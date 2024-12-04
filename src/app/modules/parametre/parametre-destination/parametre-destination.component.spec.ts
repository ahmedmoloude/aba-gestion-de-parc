import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreDestinationComponent } from './parametre-destination.component';

describe('ParametreDestinationComponent', () => {
  let component: ParametreDestinationComponent;
  let fixture: ComponentFixture<ParametreDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
