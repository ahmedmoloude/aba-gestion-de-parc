import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreContactComponent } from './parametre-contact.component';

describe('ParametreContactComponent', () => {
  let component: ParametreContactComponent;
  let fixture: ComponentFixture<ParametreContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
