import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCommentaireComponent } from './dialog-commentaire.component';

describe('DialogCommentaireComponent', () => {
  let component: DialogCommentaireComponent;
  let fixture: ComponentFixture<DialogCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCommentaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
