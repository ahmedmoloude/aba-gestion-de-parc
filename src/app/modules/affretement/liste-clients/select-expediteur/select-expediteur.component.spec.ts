import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExpediteurComponent } from './select-expediteur.component';

describe('SelectExpediteurComponent', () => {
  let component: SelectExpediteurComponent;
  let fixture: ComponentFixture<SelectExpediteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectExpediteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExpediteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
