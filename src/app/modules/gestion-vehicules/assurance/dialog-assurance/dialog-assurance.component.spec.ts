import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssuranceComponent } from './dialog-assurance.component';

describe('DialogAssuranceComponent', () => {
  let component: DialogAssuranceComponent;
  let fixture: ComponentFixture<DialogAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
