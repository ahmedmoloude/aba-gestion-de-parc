import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoEditDetailsObjectifComponent } from './dialo-edit-details-objectif.component';

describe('DialoEditDetailsObjectifComponent', () => {
  let component: DialoEditDetailsObjectifComponent;
  let fixture: ComponentFixture<DialoEditDetailsObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoEditDetailsObjectifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoEditDetailsObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
