import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModeleComponent } from './dialog-modele.component';

describe('DialogModeleComponent', () => {
  let component: DialogModeleComponent;
  let fixture: ComponentFixture<DialogModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
