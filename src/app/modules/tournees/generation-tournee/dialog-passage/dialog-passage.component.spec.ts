import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPassageComponent } from './dialog-passage.component';

describe('DialogPassageComponent', () => {
  let component: DialogPassageComponent;
  let fixture: ComponentFixture<DialogPassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
