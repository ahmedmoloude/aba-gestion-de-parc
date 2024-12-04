import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageReguliersComponent } from './passage-reguliers.component';

describe('PassageReguliersComponent', () => {
  let component: PassageReguliersComponent;
  let fixture: ComponentFixture<PassageReguliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassageReguliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageReguliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
