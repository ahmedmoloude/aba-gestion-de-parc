import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDesaffecterCarteComponent } from './dialog-desaffecter-carte.component';

describe('DialogDesaffecterCarteComponent', () => {
  let component: DialogDesaffecterCarteComponent;
  let fixture: ComponentFixture<DialogDesaffecterCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDesaffecterCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDesaffecterCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
