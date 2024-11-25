import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGammeComponent } from './dialog-gamme.component';

describe('DialogGammeComponent', () => {
  let component: DialogGammeComponent;
  let fixture: ComponentFixture<DialogGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
