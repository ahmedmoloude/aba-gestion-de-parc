import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtincteursComponent } from './extincteurs.component';

describe('ExtincteursComponent', () => {
  let component: ExtincteursComponent;
  let fixture: ComponentFixture<ExtincteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtincteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtincteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
