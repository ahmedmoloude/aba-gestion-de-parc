import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiffacteurComponent } from './motiffacteur.component';

describe('MotiffacteurComponent', () => {
  let component: MotiffacteurComponent;
  let fixture: ComponentFixture<MotiffacteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotiffacteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotiffacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
