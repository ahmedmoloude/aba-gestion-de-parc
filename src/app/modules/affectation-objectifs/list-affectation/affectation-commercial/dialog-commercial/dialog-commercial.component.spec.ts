import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCommercialComponent } from './dialog-commercial.component';

describe('DialogCommercialComponent', () => {
  let component: DialogCommercialComponent;
  let fixture: ComponentFixture<DialogCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
