import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionTraiteComponent } from './reception-traite.component';

describe('ReceptionTraiteComponent', () => {
  let component: ReceptionTraiteComponent;
  let fixture: ComponentFixture<ReceptionTraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionTraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionTraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
