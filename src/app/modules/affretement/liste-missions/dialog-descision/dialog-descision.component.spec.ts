import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDescisionComponent } from './dialog-descision.component';

describe('DialogDescisionComponent', () => {
  let component: DialogDescisionComponent;
  let fixture: ComponentFixture<DialogDescisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDescisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDescisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
