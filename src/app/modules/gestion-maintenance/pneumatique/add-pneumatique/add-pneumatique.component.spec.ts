import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPneumatiqueComponent } from './add-pneumatique.component';

describe('AddPneumatiqueComponent', () => {
  let component: AddPneumatiqueComponent;
  let fixture: ComponentFixture<AddPneumatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPneumatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPneumatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
