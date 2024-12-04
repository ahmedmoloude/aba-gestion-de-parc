import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemplacerComponent } from './dialog-remplacer.component';

describe('DialogRemplacerComponent', () => {
  let component: DialogRemplacerComponent;
  let fixture: ComponentFixture<DialogRemplacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRemplacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemplacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
