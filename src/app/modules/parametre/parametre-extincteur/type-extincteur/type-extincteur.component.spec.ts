import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExtincteurComponent } from './type-extincteur.component';

describe('TypeExtincteurComponent', () => {
  let component: TypeExtincteurComponent;
  let fixture: ComponentFixture<TypeExtincteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeExtincteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExtincteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
