import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAxeComponent } from './edit-axe.component';

describe('EditAxeComponent', () => {
  let component: EditAxeComponent;
  let fixture: ComponentFixture<EditAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAxeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
