import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDechargementComponent } from './select-dechargement.component';

describe('SelectDechargementComponent', () => {
  let component: SelectDechargementComponent;
  let fixture: ComponentFixture<SelectDechargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDechargementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDechargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
