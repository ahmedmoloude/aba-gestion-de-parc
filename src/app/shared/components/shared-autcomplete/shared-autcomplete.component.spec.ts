import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAutcompleteComponent } from './shared-autcomplete.component';

describe('SharedAutcompleteComponent', () => {
  let component: SharedAutcompleteComponent;
  let fixture: ComponentFixture<SharedAutcompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedAutcompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAutcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
