import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNmbsupportComponent } from './dialog-nmbsupport.component';

describe('DialogNmbsupportComponent', () => {
  let component: DialogNmbsupportComponent;
  let fixture: ComponentFixture<DialogNmbsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNmbsupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNmbsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
