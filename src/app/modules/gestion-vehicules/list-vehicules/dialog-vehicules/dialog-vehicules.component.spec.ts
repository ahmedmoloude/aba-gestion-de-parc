import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehiculesComponent } from './dialog-vehicules.component';

describe('DialogVehiculesComponent', () => {
  let component: DialogVehiculesComponent;
  let fixture: ComponentFixture<DialogVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVehiculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
