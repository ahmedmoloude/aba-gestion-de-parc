import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRdvComponent } from './type-rdv.component';

describe('TypeRdvComponent', () => {
  let component: TypeRdvComponent;
  let fixture: ComponentFixture<TypeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
