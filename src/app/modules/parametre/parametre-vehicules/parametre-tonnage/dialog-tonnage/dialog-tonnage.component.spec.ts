import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTonnageComponent } from './dialog-tonnage.component';

describe('DialogTonnageComponent', () => {
  let component: DialogTonnageComponent;
  let fixture: ComponentFixture<DialogTonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
