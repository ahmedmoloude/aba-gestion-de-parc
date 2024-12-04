import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVersionComponent } from './select-version.component';

describe('SelectVersionComponent', () => {
  let component: SelectVersionComponent;
  let fixture: ComponentFixture<SelectVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
