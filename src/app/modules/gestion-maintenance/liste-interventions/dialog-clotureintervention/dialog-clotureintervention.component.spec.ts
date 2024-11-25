import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClotureinterventionComponent } from './dialog-clotureintervention.component';

describe('DialogClotureinterventionComponent', () => {
  let component: DialogClotureinterventionComponent;
  let fixture: ComponentFixture<DialogClotureinterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClotureinterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClotureinterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
