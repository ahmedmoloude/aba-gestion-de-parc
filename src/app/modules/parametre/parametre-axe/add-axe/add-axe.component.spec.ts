import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAxeComponent } from './add-axe.component';

describe('AddAxeComponent', () => {
  let component: AddAxeComponent;
  let fixture: ComponentFixture<AddAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAxeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
