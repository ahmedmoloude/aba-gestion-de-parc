import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRdvComponent } from './dialog-rdv.component';

describe('DialogRdvComponent', () => {
  let component: DialogRdvComponent;
  let fixture: ComponentFixture<DialogRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
