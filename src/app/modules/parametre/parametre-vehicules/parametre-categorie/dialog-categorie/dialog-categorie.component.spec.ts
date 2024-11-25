import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategorieComponent } from './dialog-categorie.component';

describe('DialogCategorieComponent', () => {
  let component: DialogCategorieComponent;
  let fixture: ComponentFixture<DialogCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
