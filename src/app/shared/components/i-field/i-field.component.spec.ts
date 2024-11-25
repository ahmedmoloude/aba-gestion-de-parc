import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IFieldComponent } from './i-field.component';

describe('IFieldComponent', () => {
  let component: IFieldComponent;
  let fixture: ComponentFixture<IFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
