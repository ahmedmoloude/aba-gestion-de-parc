import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeTabGroupeComponent } from './administrative-tab-groupe.component';

describe('AdministrativeTabGroupeComponent', () => {
  let component: AdministrativeTabGroupeComponent;
  let fixture: ComponentFixture<AdministrativeTabGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativeTabGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeTabGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
