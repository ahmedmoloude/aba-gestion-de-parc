import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeRdvComponent } from './add-type-rdv.component';

describe('AddTypeRdvComponent', () => {
  let component: AddTypeRdvComponent;
  let fixture: ComponentFixture<AddTypeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
