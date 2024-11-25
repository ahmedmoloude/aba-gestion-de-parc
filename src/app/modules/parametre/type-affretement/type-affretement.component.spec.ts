import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAffretementComponent } from './type-affretement.component';

describe('TypeAffretementComponent', () => {
  let component: TypeAffretementComponent;
  let fixture: ComponentFixture<TypeAffretementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAffretementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAffretementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
