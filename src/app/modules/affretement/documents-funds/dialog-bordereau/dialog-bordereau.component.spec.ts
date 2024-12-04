import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBordereauComponent } from './dialog-bordereau.component';

describe('DialogBordereauComponent', () => {
  let component: DialogBordereauComponent;
  let fixture: ComponentFixture<DialogBordereauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBordereauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
