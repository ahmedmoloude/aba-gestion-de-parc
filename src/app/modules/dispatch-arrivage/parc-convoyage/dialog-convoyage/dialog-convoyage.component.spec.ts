import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConvoyageComponent } from './dialog-convoyage.component';

describe('DialogConvoyageComponent', () => {
  let component: DialogConvoyageComponent;
  let fixture: ComponentFixture<DialogConvoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConvoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConvoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
