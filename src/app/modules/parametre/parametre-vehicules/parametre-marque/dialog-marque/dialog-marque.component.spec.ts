import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMarqueComponent } from './dialog-marque.component';

describe('DialogMarqueComponent', () => {
  let component: DialogMarqueComponent;
  let fixture: ComponentFixture<DialogMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
