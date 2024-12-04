import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPleinComponent } from './dialog-plein.component';

describe('DialogPleinComponent', () => {
  let component: DialogPleinComponent;
  let fixture: ComponentFixture<DialogPleinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPleinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPleinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
