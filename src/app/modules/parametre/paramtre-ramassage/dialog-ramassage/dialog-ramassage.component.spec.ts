import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRamassageComponent } from './dialog-ramassage.component';

describe('DialogRamassageComponent', () => {
  let component: DialogRamassageComponent;
  let fixture: ComponentFixture<DialogRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
