import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBordereauVersementComponent } from './dialog-bordereau-versement.component';

describe('DialogBordereauVersementComponent', () => {
  let component: DialogBordereauVersementComponent;
  let fixture: ComponentFixture<DialogBordereauVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBordereauVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBordereauVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
