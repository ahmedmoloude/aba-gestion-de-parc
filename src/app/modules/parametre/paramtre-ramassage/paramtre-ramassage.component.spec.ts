import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamtreRamassageComponent } from './paramtre-ramassage.component';

describe('ParamtreRamassageComponent', () => {
  let component: ParamtreRamassageComponent;
  let fixture: ComponentFixture<ParamtreRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamtreRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamtreRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
