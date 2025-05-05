import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreEntityComponent } from './parametre-entity.component';

describe('ParametreEntityComponent', () => {
  let component: ParametreEntityComponent;
  let fixture: ComponentFixture<ParametreEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
