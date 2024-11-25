import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSinistresComponent } from './dialog-sinistres.component';

describe('DialogSinistresComponent', () => {
  let component: DialogSinistresComponent;
  let fixture: ComponentFixture<DialogSinistresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSinistresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSinistresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
