import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFonctionComponent } from './dialog-fonction.component';

describe('DialogFonctionComponent', () => {
  let component: DialogFonctionComponent;
  let fixture: ComponentFixture<DialogFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
