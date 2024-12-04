import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliqueRemiseComponent } from './applique-remise.component';

describe('AppliqueRemiseComponent', () => {
  let component: AppliqueRemiseComponent;
  let fixture: ComponentFixture<AppliqueRemiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliqueRemiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliqueRemiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
