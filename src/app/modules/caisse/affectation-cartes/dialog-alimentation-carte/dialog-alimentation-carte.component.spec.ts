import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlimentationCarteComponent } from './dialog-alimentation-carte.component';

describe('DialogAlimentationCarteComponent', () => {
  let component: DialogAlimentationCarteComponent;
  let fixture: ComponentFixture<DialogAlimentationCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlimentationCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlimentationCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
