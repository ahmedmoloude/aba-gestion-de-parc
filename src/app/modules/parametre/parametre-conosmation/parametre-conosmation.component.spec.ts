import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreConosmationComponent } from './parametre-conosmation.component';

describe('ParametreConosmationComponent', () => {
  let component: ParametreConosmationComponent;
  let fixture: ComponentFixture<ParametreConosmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreConosmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreConosmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
