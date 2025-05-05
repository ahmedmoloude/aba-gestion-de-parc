import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProjetComponent } from './dialog-projet.component';

describe('DialogProjetComponent', () => {
  let component: DialogProjetComponent;
  let fixture: ComponentFixture<DialogProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
